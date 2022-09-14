const Cart = require('../model/carts');
const {
    successResponse,
    loginSuccessResponse,
    errorResponse,
    paginationSuccessResponse,
} = require ('../middleware/respond')

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
            const cart = await newCart.save();

            return successResponse(
                res,
                201,
                'Cart successfully created',
                cart
            )
        } catch (error) {
            return errorResponse(res, 500, 'Internal Server Error')
        }
    }

    static async updateCart(req, res) {
        try {
            const cart = await Cart.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true }
            );

            return successResponse(
                res,
                201,
                'Cart successfully updated',
                cart
            )
        } catch (error) {
            return errorResponse(res, 500, 'Internal Server Error')
        }
    }

    static async deleteCart(req, res) {
        try {
            await Cart.findByIdAndDelete(req.params.id)

            return successResponse(
                res,
                201,
                'Cart successfully deleted',

            )
        } catch (error) {
            return errorResponse(res, 500, 'Internal Server Error')
        }
    }


    static async getUserCart(req, res) {

        try {
            const cart = await Cart.findone({ userId: req.params.userId })

            return successResponse(
                res,
                201,
                'Cart successfully fetched',
                cart
            )
        } catch (error) {
            return errorResponse(res, 500, 'Internal Server Error')
        }
    }


    static async getAllUserCarts(req, res) {
        try {
            const carts = await Cart.find();

            return successResponse(
                res,
                201,
                'Carts successfully fetched',
                carts
            )
        } catch (error) {
            return errorResponse(res, 500, 'Internal Server Error')
        }
    }
}

module.exports = CartController