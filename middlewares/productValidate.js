const { body } = require('express-validator');
const path = require('path');

let productValidate = [];
if (body("image")){
let productValidate = [
        body('name').notEmpty().withMessage('Please enter product name').bail()
        .isLength({min: 5}).withMessage('Product name must be at least 5 characters'),
        body('description').notEmpty().withMessage('Please enter product description').bail()
        .isLength({min: 20}).withMessage('Product description must be at least 20 characters'),
        body('image').custom((value, {req})=> {
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
        }),
        body('price').notEmpty().withMessage('Please enter product price').bail()
        .isDecimal().withMessage('Product price must be a number'),
        body('byRoom').notEmpty().withMessage('Please enter room category'),
        body('byTexture').notEmpty().withMessage('Please enter texture category'),
        body('color').notEmpty().withMessage('Please enter at least one color')
    ];
} else {
    let productValidate = [
        body('name').notEmpty().withMessage('Please enter product name').bail()
        .isLength({min: 5}).withMessage('Product name must be at least 5 characters'),
        body('description').notEmpty().withMessage('Please enter product description').bail()
        .isLength({min: 20}).withMessage('Product description must be at least 20 characters'),
        body('price').notEmpty().withMessage('Please enter product price').bail()
        .isDecimal().withMessage('Product price must be a number'),
        body('byRoom').notEmpty().withMessage('Please enter room category'),
        body('byTexture').notEmpty().withMessage('Please enter texture category'),
        body('color').notEmpty().withMessage('Please enter at least one color')
    ];
}
    
module.exports = productValidate