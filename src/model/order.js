const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true,
        ref: 'User'
    },

    products: [
        {
            productId: {
                type: String,
                ref: 'Product'
            },

            quantity: {
                type: Number,
                default: 1,
                max: 1000,
                trim: true
            }
        }
    ],

    amount: {
        type: Number,
        required: true
    },

    address: {
        type: Object,
        required: true
    },

    status: {
        type: String,
        default: "pending"
    },
},
    { timestamps: true }
)

module.exports = mongoose.model('Order', OrderSchema);