const express = require('express');
const {verifyToken,
    verifyTokenAndAuthorization,
    
    verifyTokenAndAdmin} = require('../middleware/jwt')
const router = express.Router();
const UserController = require('../controller/users')
const UserValidate = require ('../validation/user')
 

// UPDATE USER


router.put('/:id',
  verifyTokenAndAuthorization,
 UserController.updateUser,
 UserValidate.validateUser
 )

// DELETE USER


router.delete('/:id', 
verifyTokenAndAuthorization,
UserController.DeleteUser,
UserValidate.validateUser
)


// GET USER

router.get('/find/:id',
 verifyTokenAndAdmin,
 UserController. GetUser,
 UserValidate.validateUser
 )


// GET ALL USERS

router.get('/', 
verifyTokenAndAdmin,
UserController.GetAllUsers,
UserValidate.validateUser
)


// USER STATS
router.get('/stats',
 verifyTokenAndAdmin,
 UserController.UserStats,
 UserValidate.validateUser
 )




module.exports = router;