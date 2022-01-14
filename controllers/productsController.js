const path = require('path');
const fs = require('fs');

const productsJSONpath = path.resolve(__dirname, '../data/products.json');

const products = JSON.parse(fs.readFileSync(productsJSONpath, 'utf-8'));



const controller = {
    mainRouter: (req, res) => {
        return res.render('index.ejs', {products: products})
    },
    productsDetail: (req, res) => {
        const id = Number(req.params.id);
       return res.render('./products/productDetail.ejs', {products: products,
    id: id});
    },
    productsCart: (req, res) => {
        return res.render('./products/productCart.ejs', {products: products})
    },
    products: (req, res) => {
        return res.render('./products/products.ejs', {products: products})
    },
    productsCreate:  (req, res) => {
        
       return res.render('./products/productsCreate.ejs', {products: products})
    },
    productsEdit: (req,res) => {
        return res.render ('./products/productsEdit.ejs', {products: products})
    },
    store: (req, res) => {
        return res.redirect('/list')
    },
    update: (req, res) => {
        return res.redirect('/list')
    },
    delete: (req, res) => {
        return res.redirect('/list')
    }
}

module.exports = controller;