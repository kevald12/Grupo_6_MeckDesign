const express = require('express');

const router = express.Router();

const controller = require('../controllers/productsController.js')

router.get('/detail', controller.productsDetail);

router.get('/cart', controller.productsCart);

router.get('/list', controller.products);

router.get('/create', controller.productsCreate);

router.get ('/edit', controller.productsEdit);

module.exports = router;