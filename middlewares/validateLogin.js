const { body } = require('express-validator');
const path = require('path');
const validateLogin = [

        body('email').notEmpty().withMessage('Please enter an email').bail()
        .isEmail().withMessage('Please enter a valid email format').bail(),
        body('password').notEmpty().withMessage('Please enter a valid password').bail()
        .isLength({min: 8}).withMessage('Password must be at least 8 characters')

    ];
    
module.exports = validateLogin