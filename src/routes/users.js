const express = require('express');
const {verifyToken, verifyTokenAndAuthorization,
    
    verifyTokenAndAdmin} = require('../ulits/jwt')
const router = express.Router();
const controllerUser = require('../controller/users')

 

// UPDATE USER


router.put('/:id',
 verifyTokenAndAuthorization,
 controllerUser.updateUser
 )

// DELETE USER


router.delete('/:id', 
verifyTokenAndAuthorization,
controllerUser.deleteUser
)


// GET USER

router.get('/find/:id',
 verifyTokenAndAdmin,
controllerUser.getUser
 )


// GET ALL USERS

router.get('/', 
verifyTokenAndAdmin,
controllerUser.getAllUser,
)


// USER STATS
router.get('/stats',
 verifyTokenAndAdmin,
 controllerUser.userStats
 )




module.exports = router;