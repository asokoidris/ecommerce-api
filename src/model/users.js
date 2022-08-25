const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        min : 6
    
    },
    phoneNumber:{
        type: Number,
        
    },
    isAdmin: {
        type: Boolean,
        default:false
    }
   
},
    { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema);