const express = require('express');

const router = express.Router();
const path = require('path')

const controller = require('../controllers/productsController.js')

// Middlewares 
const productValidate = require ('../middlewares/productValidate')
const adminAccessMiddleware = require('../middlewares/adminAccessMiddleware');

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

router.get('/create', adminAccessMiddleware, controller.productsCreate);
router.post('/list',  upload.single('image'), productValidate, controller.store)

router.get('/edit/:id?', adminAccessMiddleware, controller.productsEdit);
router.put('/edit/:id?',  upload.single('image'), productValidate, adminAccessMiddleware, controller.update);

router.get('/detail/:id', controller.productsDetail);

router.delete('/list/:id', controller.delete);

router.get('/search', controller.search);

router.get('/byRoom', controller.searchByRoom);

router.get('/byTexture', controller.searchByTexture);


module.exports = router;
//alert a eliminar product