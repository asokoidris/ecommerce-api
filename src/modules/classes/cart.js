const Cart = require ('../../model/carts')


class Cart {
    constructor({userId, productId, quantity}){
        this.itemId = itemId || ''
        this.quantity = quantity || ''
        this.userId = userId || ''
    }
    
}
 module.exports = Cart