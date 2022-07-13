const express = require('express');

const UserAuthController
 = require('../controller/userAuth')
 
const router = express.Router();



router.post('/register',

UserAuthController.ControllerRegister

)



router.post('/login',

 UserAuthController.ControllerLogin
)


module.exports = router;