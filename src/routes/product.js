const express = require ('express')
const router = express.Router()
const ProductController = require ('../controller/product'); 
const {verifyToken, verifyTokenAndAuthorization, 
    verifyTokenAndAdmin} = require('../middleware/jwt');


// CREATE PRRODUCT
router.post('/',
 verifyTokenAndAdmin,
ProductController.CreateProduct
)

// UPDATE PRRODUCT

router.put('/:id',
verifyTokenAndAdmin,
ProductController.UpdateProduct
)

// DELETE PRRODUCT

router.delete('/:id',
verifyTokenAndAdmin,
ProductController.DeleteProduct
)

// GET PRRODUCT

router.get('/find/:id',
ProductController.GetProduct
)

// GET ALL PRRODUCTS

router.get('/',
ProductController.GetAllProducts
)



module.exports = router;