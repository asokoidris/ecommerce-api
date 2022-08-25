const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        ref: 'user'
    },
    products: [
        {
            productId: {
                type: String,
                ref: 'product'
            },
            quantity: {
                type: Number,
                default: 1,
                max: 1000
            },
        }
    ],
},
    { timestamps: true }
)

module.exports = mongoose.model('Cart', CartSchema);