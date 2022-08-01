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
        unique: true,
        min : 6,
        max: 15
    },
    phoneNumber:{
        type: Number,
        required: true
    },
   
},
    { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema);