const mongoose = require ('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {
        type: String, 
        required: true,
        ref: 'user'
    },
    products: [
        {
            productId:{
                type: String,
                ref: 'product'
            },
            quantity:{
                type: Number,
                default:1,
                max: 1000,
                trim: true
            }
        }
    ],
    amount:{
         type: Number,
          required: true
        },
    address:{
        type: Object,
        required: true 
     },
    status: {
         type: String,
          default: "pending"
        },
},
{timestamps: true}
)

module.exports = mongoose.model('Order', OrderSchema);