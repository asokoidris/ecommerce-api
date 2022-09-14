const Order = require('../model/order');
const {
    successResponse,
    loginSuccessResponse,
    errorResponse,
    paginationSuccessResponse,
} = require ('../middleware/respond')


/**
 * @description Order Controller
 */

class OrderController {
    /**
     * @description return a JSON data
     * @param {Object} req - HTTP Request
     * @param {Object} res - HTTP Response
     * @return {Object} Returned object
     */




    static async CreateOrder(req, res) {
        const newOrder = new Order(req.body);

        try {
            const order = await newOrder.save();

            return successResponse(
                res,
                201,
                'Order successfully created',
                order
            )
        } catch (error) {
            return errorResponse(res, 500, 'Internal Server Error')
        }
    }


    static async UpdateOrder(req, res) {

        try {
            const order = await Order.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true }
            );
            return successResponse(
                res,
                201,
                'Order successfully updated',
                order
            )
        } catch (error) {
            return errorResponse(res, 500, 'Internal Server Error')
        }
    }

    static async DeleteOrder(req, res) {
        try {
            await Order.findByIdAndDelete(req.params.id)

            return successResponse(
                res,
                201,
                'Order successfully deleted',

            )
        } catch (error) {
            return errorResponse(res, 500, 'Internal Server Error')
        }
    }

    static async GetOrder(req, res) {

        try {
            const order = await Order.findById(req.params.id)

            return successResponse(
                res,
                201,
                'Order successfully fetched',
                order
            )
        } catch (error) {
            return errorResponse(res, 500, 'Internal Server Error')
        }
    }

    static async GetAllOrders(req, res) {
        try {

            const orders = await Order.find()

            return successResponse(
                res,
                201,
                'Orders successfully fetched',
                orders
            )
        } catch (error) {
            return errorResponse(res, 500, 'Internal Server Error')
        }
    }


    static async GetOrderStats(req, res) {
        const date = new Date();
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
        const previousMoth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))

        try {
            const income = await Order.aggregate([
                { $match: { createdAt: { $gte: previousMoth } } },
                {
                    $project: {
                        month: { $month: '$createdAt' },
                        sales: '$amount',
                    },
                },
                {
                    $group: {
                        _id: '$amount',
                        total: { $sum: 'sales' },
                    },
                },
            ]);

            return successResponse(
                res,
                201,
                'Income successfully fetched',
                income
            )
        } catch (error) {
            return errorResponse(res, 500, 'Internal Server Error')
        }
    }
}

module.exports = OrderController