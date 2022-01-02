const express = require('express');

const router = express.Router();

const controller = require('../controllers/productsController.js');
router.get('/', controller.mainRouter);

module.exports = router;