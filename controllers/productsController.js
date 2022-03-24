const path = require('path');
const fs = require('fs');
const {Product, ByRoom, ByTexture, Color} = require('../database/models');
const productsJSONpath = path.resolve(__dirname, '../data/products.json');
const {Op} = require('sequelize')

const products = JSON.parse(fs.readFileSync(productsJSONpath, 'utf-8'));


const controller = {
    mainRouter: async (req, res) => {
        const otherProducts = await Product.findAll({include: ['byRoom', 'byTexture', 'color']})
        return res.render('index.ejs', {
            otherProducts: otherProducts
        })
    },
    productsDetail: async (req, res) => {
        const otherProducts = await Product.findAll({include: ['byRoom', 'byTexture', 'color']})
        const id = Number(req.params.id);
    try{
		const product = await Product.findByPk(id, {include: ["byRoom", "byTexture", "color"]});              
        return res.render('./products/productDetail.ejs', {
            product: product,
            id: id,
            otherProducts: otherProducts
            
        });
    }
        catch (error) { 
            console.log(error)
        }
    },
    productsCart: (req, res) => {
        return res.render('./products/productCart.ejs', {
            products: products
        })
    },
    products: async (req, res) => {
        const products = await Product.findAll({include: ["byRoom", "byTexture"]})
        return res.render('./products/products.ejs', {
            products
        })
    },
    productsCreate: async (req, res) => {
           try{
               const byroom = await ByRoom.findAll({});
              const bytexture = await ByTexture.findAll({});
              const color = await Color.findAll({});
           
        return res.render('./products/productsCreate.ejs', {
            products: products,
            byroom,
            bytexture,
            color
        });
        
    }
    catch (error){
        console.log(error)
    }
    },
    productsEdit: async (req, res) => {
        
        const productID = Number(req.params.id);
        const byroom = await ByRoom.findAll({});
        const bytexture = await ByTexture.findAll({});
        const color = await Color.findAll({});

		const product = await Product.findByPk(req.params.id, {include: ["byRoom", "byTexture", "color"]});

        return res.render('./products/productsEdit.ejs', {
            product: product,
            id: productID,
            byroom,
            bytexture,
            color
        })
    },
    store: async (req, res) => {
        let productToStore = {
            ...req.body,
            image: req.file.filename,
            byRoomId: req.body.byRoom,
            byTextureId: req.body.byTexture

        }
        
        try {
        const productStored = await Product.create(productToStore)
        productStored.addColor(req.body.color)
        return res.redirect('/products/list')
        }
        catch (error){
            console.log(error)
        }
    },
   

    update: async (req, res) => {

        const productID = Number(req.params.id);
try {
        const productUpdate = await Product.findByPk(productID, {
            include : ['byRoom','byTexture','color'] });

                if (req.body.color){
            productUpdate.removeColor(productUpdate.color);
            productUpdate.addColor(req.body.color);
                }
                
            if (req.file){
                productUpdate.image = req.file.filename
                }
            productUpdate.name = req.body.name ? req.body.name : productUpdate.name;
            productUpdate.description = req.body.description ? req.body.description : productUpdate.description;
            productUpdate.price = req.body.price ? req.body.price : productUpdate.price;
            productUpdate.byRoomId = req.body.byRoom ? req.body.byRoom : productUpdate.byRoom;
            productUpdate.byTextureId = req.body.byTexture ? req.body.byTexture : productUpdate.byTexture;

            
            productUpdate.save();

        return res.redirect('/products/list')
} catch (error){
    console.log(error)
}

    },

search : async (req, res) =>{
    const products = await Product.findAll(
        {
            where: {
name:{
[Op.like]: "%" + req.query.search + "%"
}
        }})

    return res.render('./products/products.ejs', {
        products
    })

},

    delete: async (req, res) => {
        const idDelete = Number(req.params.id);
        const deletedProduct = await Product.findByPk(idDelete, {include: ["byRoom", "byTexture", "color"]})
        deletedProduct.removeColor(deletedProduct.color)
        Product.destroy({where: {id: idDelete}})

        

        return res.redirect('/products/list');
    }
}

module.exports = controller;