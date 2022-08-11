const express = require('express');

const  UserValidate = require('../validation/user')
const UserAuthController
    = require('../controller/userAuth')

const router = express.Router();



router.post('/register',
    UserAuthController.userSignUp,
    UserValidate.validateUser
)



router.post('/login',
  UserAuthController.userSignIn,
  UserValidate.validateUser
 )


module.exports = router;