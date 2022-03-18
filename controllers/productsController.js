const path = require('path');
const fs = require('fs');
const {Product, ByRoom, ByTexture, Color} = require('../database/models');
const productsJSONpath = path.resolve(__dirname, '../data/products.json');

const products = JSON.parse(fs.readFileSync(productsJSONpath, 'utf-8'));


const controller = {
    mainRouter: (req, res) => {
        return res.render('index.ejs', {
            products: products
        })
    },
    productsDetail: async (req, res) => {
        const id = Number(req.params.id);
    try{
		const product = await Product.findByPk(id, {include: ["byRoom", "byTexture", "color"]});              
        return res.render('./products/productDetail.ejs', {
            product: product,
            id: id,
            
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
        console.log("ESTO ES EL PRODUCT UPDATE!!!!!" + productUpdate)
        console.log("ESTO ES EL PRODUCT UPDATE con byRoom!!!!!" + productUpdate.byRoom)

            productUpdate.removeByRoom(productUpdate.byRoomId);
            
            productUpdate.removeByTextureId(productUpdate.byTextureId);
            productUpdate.removeColor(productUpdate.color);
            
            productUpdate.addByroom(req.body.byRoom);
            productUpdate.addByTexture(req.body.byTexture);
            productUpdate.addColor(req.body.color);

            productUpdate.name = req.body.name ? req.body.name : product.name;
            productUpdate.description = req.body.description ? req.body.description : product.description;
            productUpdate.image = req.file ? req.file.filename : "default_img.png";
            productUpdate.price = req.body.price ? req.body.price : product.price;
            
            productUpdate.save();

        return res.redirect('/products/list')
} catch (error){
    console.log(error)
}
    },


    delete: (req, res) => {
        const idDelete = Number(req.params.id);

        const arrayDelete = products.filter(oneProduct => oneProduct.id !== idDelete);

        fs.writeFileSync(productsJSONpath, JSON.stringify(arrayDelete, null, ' '));

        return res.redirect('/products/list');
    }
}

module.exports = controller;