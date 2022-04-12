const express = require('express');

const router = express.Router();

const apiProduct = require ('../../controllers/api/apiProducts')



router.get("/api/products/", movieController.count);

router.get("/api/products/:id", movieController.show);

router.get("/api/products/:id", movieController.store);








module.exports = router