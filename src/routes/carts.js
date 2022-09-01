const express = require('express')
const router = express.Router()
const CartController = require('../controller/cart')
const { verifyToken, verifyTokenAndAuthorization,
     verifyTokenAndAdmin } = require('../middleware/jwt');
const CartValidate = require('../validation/carts')

// CREATE cart
router.post('/',
     verifyToken,
     CartController.createCart,
     CartValidate.validateCart
)

// UPDATE CART

router.put('/:id',
     verifyTokenAndAuthorization,
     CartController.updateCart,
     CartValidate.validateCart
)


// DELETE CART

router.delete('/:id',
     verifyTokenAndAuthorization,
     CartController.deleteCart,
     CartValidate.validateCart
)

// GET USER CART

router.get('/find/:userId',
     verifyTokenAndAuthorization,
     CartController.getUserCart,
     CartValidate.validateCart
)


// GET ALL CARTS
router.get('/',
     verifyTokenAndAdmin,
     CartController.getAllUserCarts,
     CartValidate.validateCart
)




module.exports = router;