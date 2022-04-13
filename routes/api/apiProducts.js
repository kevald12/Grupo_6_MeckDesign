const express = require('express');

const router = express.Router();

const apiProductsController = require ('../../controllers/api/apiProductsController')


router.get("/", apiProductsController.count);

router.get("/:id", apiProductsController.show);

router.post("/store", apiProductsController.store);








module.exports = router