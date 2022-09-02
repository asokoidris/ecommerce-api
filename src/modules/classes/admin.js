const Admin = require ('../../module/admin');


class Admin {
    constructor({ id, role, email, username, firstName, lastName, status }) {
        this.id = id || ''
        this.role = [...role] || ['']
        this.email = email || ''
        this.username = username || ''
        this.firstName = firstName || ''
        this.lastName = lastName || ''
        this.status = status || ''
    }
}

module.exports = Admin


