const { body } = require('express-validator');
const path = require('path');
const validations = [
        body('firstName').notEmpty().withMessage('Please enter your first name'),
        body('lastName').notEmpty().withMessage('Please enter your last name'),
        body('email').notEmpty().withMessage('Please enter an email').bail()
        .isEmail().withMessage('Please enter a valid email format').bail(),
        body('password').notEmpty().withMessage('Please enter a valid password').bail(),
        body('avatar').custom((value, {req})=> {
            let file = req.file;
            let acceptedExtensions = ['.png', '.jpg', '.jpeg'];
            if (!file){
                throw new Error('Please upload a valid image')
            } else {
                let fileExtension = path.extname(file.originalname);
            if (file && !acceptedExtensions.includes(fileExtension)){
                throw new Error(`The accepted file extentions are ${acceptedExtensions.join(', ')}`)
            }
        }
        return true;
        })
    ];
    
module.exports = validations