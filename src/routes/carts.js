const express = require ('express')
const router = express.Router()
const ControllerCart = require ('../controller/cart')
const {verifyToken, verifyTokenAndAuthorization,
     verifyTokenAndAdmin} = require('../middleware/jwt');


// CREATE cart
router.post('/',
 verifyToken,
 ControllerCart.CreateCart
 )

// UPDATE CART

 router.put('/:id',
 verifyTokenAndAuthorization,
 ControllerCart.UpdateCart
 )


// DELETE CART

 router.delete('/:id',
 verifyTokenAndAuthorization,
 ControllerCart.DeleteCart
 )

 // GET USER CART

 router.get('/find/:userId',
  verifyTokenAndAuthorization,
  ControllerCart.GetUserCart
  )


 // GET ALL CARTS
 router.get('/', 
 verifyTokenAndAdmin,
 ControllerCart.GetAllUserCart
  )




module.exports = router;