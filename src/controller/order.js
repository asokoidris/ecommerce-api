const Order = require ('../model/order');



exports.CreateOrder =  async (req, res) => {
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder)
    } catch (err) {
        res.status(500).json(err)
    }
}


exports.UpdateOrder =  async (req, res) => {

    try {
        const updatedOrder = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true }
        );
        res.status(200).json(updatedOrder)
    } catch (err) {
        res.status(500).json(err)
    }
}


exports.DeleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json('Order has been deleted....')

    } catch (err) {
        res.status(500).json(err)
    }
}

exports.GetOrder = async (req, res) => {

    try {
        const orders = await Order.findById(req.params.id)
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.GetAllOrders =  async (req, res) => {
    try {

        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json(err)
    }
}


exports.GetOrderStats =  async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1))
    const previousMoth = new Date(new Date().setMonth(lastMonth.getMonth()-1))

    try{
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
        res.status(200). json(income)

    } catch (err) {
        res.status(500).json(err)
    }
}