const Product = require('../model/products');
const {
    successResponse,
    loginSuccessResponse,
    errorResponse,
    paginationSuccessResponse,
} = require ('../middleware/respond')



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
            const product = await newProduct.save();

            return successResponse(
                res,
                201,
                'Product successfully created',
                product
            )
        } catch (error) {
            return errorResponse(res, 500, 'Internal Server Error')
        }
    }


    static async UpdateProduct(req, res) {

        try {
            const product = await Product.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true }
            );

            return successResponse(
                res,
                201,
                'Product successfully updated',
                product
            )
        } catch (error) {
            return errorResponse(res, 500, 'Internal Server Error')
        }
    }


    static async DeleteProduct(req, res) {
        try {
            await Product.findByIdAndDelete(req.params.id)

            return successResponse(
                res,
                201,
                'Product successfully deleted',

            )

        } catch (error) {
            return errorResponse(res, 500, 'Internal Server Error')
        }
    }


    static async GetProduct(req, res) {

        try {
            const product = await Product.findById(req.params.id)

            return successResponse(
                res,
                201,
                'Product successfully fetched',
                product
            )
        } catch (error) {
            return errorResponse(res, 500, 'Internal Server Error')
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

            return successResponse(
                res,
                201,
                'Products successfully fetched',
                products
            )
        } catch (error) {
            return errorResponse(res, 500, 'Internal Server Error')
        }

    }
}


module.exports = ProductController;