const express = require('express');

const router = express.Router();

router.get('/register', (req, res) => {
    res.render('./users/register.ejs')
});
router.get('/login', (req, res) => {
    res.render('./users/login.ejs')
});

module.exports = router;