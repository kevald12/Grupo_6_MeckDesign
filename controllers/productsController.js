const path = require('path');
const fs = require('fs');
const {Product, ByRoom, ByTexture, Color, Cart} = require('../database/models');
const productsJSONpath = path.resolve(__dirname, '../data/products.json');
const {Op} = require('sequelize')

const products = JSON.parse(fs.readFileSync(productsJSONpath, 'utf-8'));

const { validationResult } = require('express-validator');

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
    productsCart: async (req, res) => {
        const otherProducts = await Product.findAll({include: ['byRoom', 'byTexture', 'color']})
        const cart = await Cart.findByPk(req.session.cartId, {include: "product"})
        if(cart){
            for(let i = 0; i < cart.product.length; i++){
                console.log("carrito en cart", cart.product[i].dataValues.name)

            }
        }
        return res.render('./products/productCart.ejs', {
            products: products,
            otherProducts: otherProducts,
            cart: cart
        })
    },
    products: async (req, res) => {
        const products = await Product.findAll({include: ["byRoom", "byTexture"]})
        const byRoom = await ByRoom.findAll()
        const byTexture = await ByTexture.findAll()

        return res.render('./products/products.ejs', {
            products,
            byRoom,
            byTexture
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
        const byroom = await ByRoom.findAll({});
        const bytexture = await ByTexture.findAll({});
        const color = await Color.findAll({});

        let productToStore = {
            ...req.body,
            image: req.file?.filename,
            byRoomId: req.body.byRoom,
            byTextureId: req.body.byTexture

        }

        var resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
        return res.render("./products/productsCreate.ejs", {
            errors: resultValidation.mapped(),
            oldData: req.body,
            byroom,
            bytexture,
            color
        });
    };
        
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
        
    try {
        const productID = Number(req.params.id);
        const byroom = await ByRoom.findAll({});
        const bytexture = await ByTexture.findAll({});
        const color = await Color.findAll({});
 
        const productUpdate = await Product.findByPk(productID, {
            include : ['byRoom','byTexture','color'] });
            var resultValidation = validationResult(req);
            if (resultValidation.errors.length > 0) {
                return res.render("./products/productsEdit", {
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                    byroom,
            bytexture,
            color,
            product: productUpdate
                });
            };
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
searchByRoom:  async (req, res) =>{
    const byRoom = await ByRoom.findAll()
    const byTexture = await ByTexture.findAll()
    const imInByRoom = true
    const roomQuery = req.query.searchByRoom

    const products = await Product.findAll(
        {
            where: {
byRoomId:{
[Op.eq]: req.query.searchByRoom 
}
        },
        include: ["byRoom", "byTexture", "color"]})
console.log("req query", req.query )
    return res.render('./products/products.ejs', {
        products,
        byRoom,
        byTexture,
        imInByRoom,
        roomQuery
    })

},
searchByTexture:  async (req, res) =>{
    const byRoom = await ByRoom.findAll()
    const byTexture = await ByTexture.findAll()
    const imInByTexture = true
    const textureQuery = req.query.searchByTexture
    const products = await Product.findAll(
        {
            where: {
byTextureId:{
[Op.eq]: req.query.searchByTexture 
}
        },
        include: ["byRoom", "byTexture", "color"]})
console.log("req query", req.query.searchByTexture )
    return res.render('./products/products.ejs', {
        products,
        byRoom,
        byTexture,
        imInByTexture,
        textureQuery
    })

},
search : async (req, res) =>{
    const byRoom = await ByRoom.findAll()
    const byTexture = await ByTexture.findAll()
    const products = await Product.findAll(
        {
            where: {
name:{
[Op.like]: "%" + req.query.search + "%" 
}
        }})

    return res.render('./products/products.ejs', {
        products,
        byRoom,
        byTexture
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