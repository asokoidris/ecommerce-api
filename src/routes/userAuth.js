const express = require('express');
const {registerValidation, loginValidation}
 = require ('../validation/userAuth')

const UserAuthController
 = require('../controller/userAuth')
 
const router = express.Router();



router.post('/register',
registerValidation,
UserAuthController.ControllerRegister

)



router.post('/login',
loginValidation,
 UserAuthController.ControllerLogin
)


module.exports = router;