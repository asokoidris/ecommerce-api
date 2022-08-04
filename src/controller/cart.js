const Cart = require('../model/carts');


/**
 * @description Cart Controller
 */

class CartController {
    /**
     * @description return a JSON data
     * @param {Object} req - HTTP Request
     * @param {Object} res - HTTP Response
     * @return {Object} Returned object
     */

    static async createCart(req, res) {
        const newCart = new Cart(req.body);

        try {
            const savedCart = await newCart.save();
            res.status(200).json(savedCart)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async updateCart(req, res) {
        try {
            const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true }
            );
            res.status(200).json(updatedCart)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async deleteCart(req, res) {
        try {
            await Cart.findByIdAndDelete(req.params.id)
            res.status(200).json('Cart has been deleted....')

        } catch (err) {
            res.status(500).json(err)
        }
    }


    static async getUserCart(req, res) {

        try {
            const cart = await Cart.findone({ userId: req.params.userId })
            res.status(200).json(cart)
        } catch (err) {
            res.status(500).json(err)
        }
    }


    static async getAllUserCarts(req, res) {
        try {
            const carts = await Cart.find();
            res.status(200).json(carts)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = CartController