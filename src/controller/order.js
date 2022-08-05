const Order = require('../model/order');



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
            const savedOrder = await newOrder.save();
            res.status(200).json(savedOrder)
        } catch (err) {
            res.status(500).json(err)
        }
    }


    static async UpdateOrder(req, res) {

        try {
            const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true }
            );
            res.status(200).json(updatedOrder)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async DeleteOrder(req, res) {
        try {
            await Order.findByIdAndDelete(req.params.id)
            res.status(200).json('Order has been deleted....')

        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async GetOrder(req, res) {

        try {
            const orders = await Order.findById(req.params.id)
            res.status(200).json(orders)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async GetAllOrders(req, res) {
        try {

            const orders = await Order.find()
            res.status(200).json(orders)
        } catch (err) {
            res.status(500).json(err)
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
            res.status(200).json(income)

        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = OrderController