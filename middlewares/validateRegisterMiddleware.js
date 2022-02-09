const { body } = require('express-validator');
const path = require('path');
const validations = [
        body('first_name').notEmpty().withMessage('Please enter your first name'),
        body('last_name').notEmpty().withMessage('Please enter your last name'),
        body('email').notEmpty().withMessage('Please enter an email').bail()
        .isEmail().withMessage('Please enter a valid email format').bail()
        .normalizeEmail(),
        body('password').notEmpty().withMessage('Please enter a valid password').bail(),
        body('userAvatar').custom((value, {req})=> {
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