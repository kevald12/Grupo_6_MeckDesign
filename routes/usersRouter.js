// Modules
const express = require('express');
const path = require('path');
const router = express.Router();

// Middlewares 
const upload = require ('../middlewares/multerMiddleware')
const validations = require('../middlewares/validateRegisterMiddleware')
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');


const controller = require ('../controllers/usersController.js');

// Routes
router.get('/register', authMiddleware, controller.register);
router.post('/register', upload.single('userAvatar'), validations, controller.createUser);
router.get('/login', authMiddleware, controller.login);
router.post('/login', controller.processLogin);
router.get('/profile', guestMiddleware, controller.profile);
router.post('/logout', controller.logout);

module.exports = router;