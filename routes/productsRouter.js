const express = require('express');

const router = express.Router();

const controller = require('../controllers/productsController.js')

router.get('/detail/:idProduct', controller.productsDetail);

router.get('/cart', controller.productsCart);

router.get('/list/:page?', controller.products);

router.get('/create', controller.productsCreate);

router.get ('/edit', controller.productsEdit);

module.exports = router;