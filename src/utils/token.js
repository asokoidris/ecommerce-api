const jwt = require ('jsonwebtoken');
const key = require ('../config/key')
const User = require ('../model/users')


class Token{

static async generateToken ({id}) {
    const payload = {subject:id}
try{
    const accessKey = jwt.sign(
            payload,
            process.env.JWT_SEC,
            process.env.EXP_SEC
        );
}catch(error) {
    return error.message
}
}


}


module.exports = Token