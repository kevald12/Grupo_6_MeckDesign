const express = require('express');

const router = express.Router();
const path = require('path')

const controller = require('../controllers/productsController.js')

const multer = require ('multer');
// const { path } = require('express/lib/application');

const diskStorage = multer.diskStorage ({

    destination:(req,file,cb) => {
        cb (null,path.resolve(__dirname,'../public/img/products')); 
        
    },
    
    filename:(req,file,cb) => {
        const finalName = Date.now() + '-' + 'products' + path.extname(file.originalname)
        cb(null,finalName)
    }

});
const upload = multer({ 
	storage: diskStorage,
	fileFilter: (req, file, cb) => {
		const acceptedExtensions = [".jpg", ".png", ".jpeg", ".gif"];
		const fileExtension = path.extname(file.originalname).toLowerCase();
		if (acceptedExtensions.includes(fileExtension)) {
			cb(null, true);
		} else {
			return cb("Only .png, .jpg, .jpeg and .gif format allowed!");
		}
	}
});


router.get('/list', controller.products);

router.get('/cart', controller.productsCart);

router.get('/create', controller.productsCreate);
router.post('/list', upload.single('img'), controller.store)

router.get('/edit/:id?', controller.productsEdit);
router.put('/edit/:id?', upload.single('img'), controller.update);

router.get('/detail/:id', controller.productsDetail);

router.delete('/list/:id', controller.delete)

module.exports = router;
