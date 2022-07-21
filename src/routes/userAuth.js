const express = require('express');


const UserAuthController
    = require('../controller/userAuth')

const router = express.Router();



router.post('/register',
    UserAuthController.userSignUp
)



router.post('/login',
 UserAuthController.userSignIn
)


module.exports = router;