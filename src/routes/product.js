const express = require('express')
const router = express.Router()
const ProductValidate = require('../validation/product')
const ProductController = require('../controller/product');
const { verifyToken, verifyTokenAndAuthorization,
    verifyTokenAndAdmin } = require('../middleware/jwt');

// CREATE PRRODUCT
router.post('/',
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