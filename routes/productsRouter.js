const express = require('express');

const router = express.Router();

const controller = require('../controllers/productsController.js')



router.get('/list/:page?', controller.products);

router.get('/cart', controller.productsCart);

router.get('/create', controller.productsCreate);
router.post('/create', controller.store)

router.get ('/edit/:id?', controller.productsEdit);
router.put ('/edit/:id?', controller.update)

router.get('/detail/:id', controller.productsDetail);

router.delete('/:id', controller.delete)

module.exports = router;
