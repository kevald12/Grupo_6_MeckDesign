const express = require('express');

const router = express.Router();

const controller = require('../controllers/productsController')

router.get('/productDetail', controller.productsDetail);

router.get('/productCart', controller.productsCart);

router.get('/products', controller.products);

router.get('/productsCreate', controller.productsCreate);

module.exports = router;