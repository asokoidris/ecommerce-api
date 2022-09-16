const express = require('express')
const router = express.Router()
const ProductValidate = require('../validation/product')
const ProductController = require('../controller/product');
const { verifyToken, verifyTokenAndAuthorization,
    verifyTokenAndAdmin } = require('../middleware/jwt');

    const multer = require('multer')
    const path = require('path');
    
    const imageStorage = multer.diskStorage({
      // Destination to store image
      destination: 'uploads',
      filename: (req, file, cb) => {
        cb(
          null,
          file.fieldname + '_' + Date.now() + path.extname(file.originalname)
        );
        // file.fieldname is name of the field (image)
        // path.extname get the uploaded file extension
      },
    });
    
    const imageUpload = multer({
      storage: imageStorage,
      limits: {
        fileSize: 1000000 * 5, // 5000000 Bytes = 5 MB
      },
      fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
          // upload only png and jpg format
          return cb(new Error('Please upload a Image'));
        }
        cb(undefined, true);
      },
    });
    
    
    


// CREATE PRRODUCT
router.post('/',
imageUpload.single('image'),
    verifyTokenAndAdmin,
    ProductController.CreateProduct,
    ProductValidate.validateProduct
)

// UPDATE PRRODUCT

router.put('/:id',
    verifyTokenAndAdmin,
    ProductController.UpdateProduct,
    ProductValidate.validateProduct
)

// DELETE PRRODUCT

router.delete('/:id',
    verifyTokenAndAdmin,
    ProductController.DeleteProduct,
    ProductValidate.validateProduct
)

// GET PRRODUCT

router.get('/find/:id',
    ProductController.GetProduct,
    ProductValidate.validateProduct
)

// GET ALL PRRODUCTS

router.get('/',
    ProductController.GetAllProducts,
    ProductValidate.validateProduct
)



module.exports = router;