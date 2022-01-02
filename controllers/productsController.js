

const controller = {
    mainRouter: (req, res) => {
        return res.render('index.ejs')
    },
    productsDetail: (req, res) => {
       return res.render('./products/productDetail.ejs')
    },
    productsCart: (req, res) => {
        return res.render('./products/productCart.ejs')
    },
    products: (req, res) => {
        return res.render('./products/products.ejs')
    },
    productsCreate:  (req, res) => {
       return res.render('./products/productsCreate.ejs')
    }
}

module.exports = controller;