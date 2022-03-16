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
    productsDetail: (req, res) => {
        const id = Number(req.params.id);
        return res.render('./products/productDetail.ejs', {
            products: products,
            id: id
        });
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
    productsEdit: (req, res) => {
        
        const productID = Number(req.params.id);

		const theProduct = products.find(product => product.id === productID);

        return res.render('./products/productsEdit.ejs', {
            theProduct: theProduct,
            id: productID
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
        // productStored.addColor(req.body.color)
        return res.redirect('/list')
        }
        catch (error){
            console.log(error)
        }
    },
   

    update: (req, res) => {

        const productID = Number(req.params.id);

        const productUpdate = products.map(theProduct =>{
            if(theProduct.id === productID){
                return {
                    ...theProduct,
                        name: req.body.name,
                        description: req.body.description,
                        price: req.body.price,
                        categoriesRoom: req.body.categoriesRoom,
                        categoriesTexture: req.body.categoriesTexture,
                        img: req.file ? req.file.filename : theProduct.img
                    };
                };
            return theProduct;
        });

        fs.writeFileSync(productsJSONpath, JSON.stringify(productUpdate, null, ' '));

        return res.redirect('/products/list')
    },


    delete: (req, res) => {
        const idDelete = Number(req.params.id);

        const arrayDelete = products.filter(oneProduct => oneProduct.id !== idDelete);

        fs.writeFileSync(productsJSONpath, JSON.stringify(arrayDelete, null, ' '));

        return res.redirect('/products/list');
    }
}

module.exports = controller;