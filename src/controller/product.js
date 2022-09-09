const Product = require('../model/products');




/**
 * @description Product Controller
 */

class ProductController {
    /**
     * @description return a JSON data
     * @param {Object} req - HTTP Request
     * @param {Object} res - HTTP Response
     * @return {Object} Returned object
     */


    static async CreateProduct(req, res) {
        const newProduct = new Product(req.body);

        try {
            const savedProduct = await newProduct.save();
            res.status(200).json(savedProduct)
        } catch (err) {
            res.status(500).json(err)
        }
    }


    static async UpdateProduct(req, res) {

        try {
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true }
            );
            res.status(200).json(updatedProduct)
        } catch (err) {
            res.status(500).json(err)
        }
    }


    static async DeleteProduct(req, res) {
        try {
            await Product.findByIdAndDelete(req.params.id)
            res.status(200).json('Product has been deleted....')

        } catch (err) {
            res.status(500).json(err)
        }
    }


    static async GetProduct(req, res) {

        try {
            const product = await Product.findById(req.params.id)
            res.status(200).json(product)
        } catch (err) {
            res.status(500).json(err)
        }
    }


    static async GetAllProducts(req, res) {
        const qNew = req.query.new;
        const qCat = req.body.category;
        try {
            let products;

            if (qNew) {
                products = await Product.find().sort({ createdAt: -1 }).limit(3);
            } else if (qCat) {
                products = await Product.find({
                    categories: {
                        $in: [qCategory]
                    }
                })
            } else {
                products = await Product.find()
            }
            res.status(200).json(products)
        } catch (error) {
            res.status(500).json(error.message)
        }

    }
}


module.exports = ProductController;