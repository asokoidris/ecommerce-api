const bcrypt = require('bcryptjs');


class HelperFunction {


    static async hashPassword(password) {
        const hash = await bcrypt.hash(password, 10)
        return hash
    }

    static async comparePassword(password, hash) {
        const isValid = await bcrypt.compare(password, hash)
        return isValid
    }
}

module.exports = HelperFunction 