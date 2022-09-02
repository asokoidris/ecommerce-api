const mongoose = require ('mongoose');

const AdminSchema = new mongoose.Schema({

    username: {
        type: 'string',
        required: [true, 'Admin must have a username'],
        trim: true,
        unique: true,
        sparse: true,
    },
    email: {
        type: String,
        required: [true, 'Admin must have a email'],
        trim: true,
        unique: true,
        sparse: true,
    },
    firstName: {
        type: String,
        required: [true, 'Admin must have a firstName'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Admin must have a lastName'],
        trim: true,
    },
    role: {
        type: [String],
        default: 'admin',
    
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'active',
    
    },
})
module.exports = mongoose.model('Admin', AdminSchema)
