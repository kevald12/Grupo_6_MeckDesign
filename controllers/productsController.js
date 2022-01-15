const path = require('path');
const fs = require('fs');
const req = require('express/lib/request');

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
    products: (req, res) => {
        return res.render('./products/products.ejs', {
            products: products
        })
    },
    productsCreate: (req, res) => {

        return res.render('./products/productsCreate.ejs', {
            products: products
        })
    },
    productsEdit: (req, res) => {
        
        const productID = Number(req.params.id);

		const theProduct = products.find(product => product.id === productID);

        return res.render('./products/productsEdit.ejs', {
            theProduct: theProduct,
            id: productID
        })
    },
    store: (req, res) => {

        var generateID = () => {
            return 1;
        }
        if (products.length >= 1) {
            generateID = () => {
                var lastProduct = products[products.length - 1];

                var lastId = lastProduct.id;

                return lastId + 1;

            }
        } else {
            generateID = () => {
                return 1
            }
        };
            products.push({
                id: generateID (),
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                categoriesRoom: req.body.categoryRoom,
                categoriesTexture: req.body.categoryTexture,
                img: req.file.filename
            });
            
            fs.writeFileSync(productsJSONpath, JSON.stringify(products, null, ' '));

        return res.redirect('/products/list')
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