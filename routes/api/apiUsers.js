const express = require('express');

const router = express.Router();

const apiProduct = require ('../../controllers/api/apiUsers')


router.get("/api/users/", movieController.show);
router.post("/api/users/:id", movieController.store);




module.exports = router