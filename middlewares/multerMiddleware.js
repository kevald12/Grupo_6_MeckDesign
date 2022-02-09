const path = require('path');
const multer = require ('multer');

const diskStorage = multer.diskStorage ({

    destination:(req,file,cb) => {
        cb (null,path.resolve(__dirname,'../public/img/usersImg')); 
        
    },
    
    filename:(req,file,cb) => {
        const finalName = Date.now() + '-' + 'avatar' + path.extname(file.originalname)
        cb(null,finalName)
    }

});
const upload = multer({ 
	storage: diskStorage
	// fileFilter: (req, file, cb) => {
	// 	const acceptedExtensions = [".jpg", ".png", ".jpeg", ".gif"];
	// 	const fileExtension = path.extname(file.originalname).toLowerCase();
	// 	if (acceptedExtensions.includes(fileExtension)) {
	// 		cb(null, true);
	// 	} else {
	// 		return cb("Only .png, .jpg, .jpeg and .gif format allowed!");
	// 	}
	// }
});

module.exports = upload;
