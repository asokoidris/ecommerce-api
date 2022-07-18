const express = require('express')
const router = express.Router()
const OrderController = require ('../controller/order');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/jwt');


// CREATE ORDER
router.post('/',
 verifyToken,
OrderController.CreateOrder
)



// UPDATE ORDER


router.put('/:id',
 verifyTokenAndAdmin,
 OrderController.UpdateOrder
 )


// DELETE ORDER


router.delete('/:id',
 verifyTokenAndAdmin,
 OrderController.DeleteOrder
 )


// GET USER ORDERS

router.get('/find/:id',
 verifyTokenAndAuthorization,
 OrderController.GetOrder
 )


// GET ALL ORDERS

router.get('/'
, verifyTokenAndAdmin,
OrderController.GetAllOrders
)


// GET MONTHLY INCOME

router.get('/income',
 verifyTokenAndAdmin,
 OrderController.GetOrderStats
 )


module.exports = router;