const Product = require ('../model/products');


exports.CreateProduct = async (req, res) => {
    const newProduct = new Product(req.body);

    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct)
    } catch(err) {
        res.status(500). json(err)
    }
}


exports.UpdateProduct = async (req, res) => {

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


exports.DeleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json('Product has been deleted....')

    } catch (err) {
        res.status(500).json(err)
    }
}


exports.GetProduct = async (req, res) => {

    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch (err) {
        res.status(500).json(err)
    }
}


exports.GetAllProducts = async (req, res) => {
    const qNew = req.query.new;
     const qCat = req.body.category;
    try {
        let products;

        if(qNew){
            products = await Product.find().sort({createdAt: -1 }).limit(3);
         } else if (qCat) {products = await Product.find({
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