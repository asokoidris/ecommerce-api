const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        ref: 'user'
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'itemId',
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