const express = require ('express')
const router = express.Router()
const CartController = require ('../controller/cart')
const {verifyToken, verifyTokenAndAuthorization,
     verifyTokenAndAdmin} = require('../middleware/jwt');


// CREATE cart
router.post('/',
 verifyToken,
 CartController.createCart
 )

// UPDATE CART

 router.put('/:id',
 verifyTokenAndAuthorization,
 CartController.updateCart
 )


// DELETE CART

 router.delete('/:id',
 verifyTokenAndAuthorization,
 CartController.deleteCart
 )

 // GET USER CART

 router.get('/find/:userId',
  verifyTokenAndAuthorization,
  CartController.getUserCart
  )


 // GET ALL CARTS
 router.get('/', 
 verifyTokenAndAdmin,
 CartController.getAllUserCarts
  )




module.exports = router;