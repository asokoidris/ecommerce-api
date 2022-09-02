class User{
    constructor({
        id,
        _id,
        email,
        phoneNumber,
        username,
    }){
        this.id = id || _id
        this.email = email || ''
        this.phoneNumber = phoneNumber || ''
        this.username = username || ''

    }
}
module.exports = User