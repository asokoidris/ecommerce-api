const express = require ('express')
const router = express.Router()
const Product = require ('../model/products'); 
 const  productValidation = require ('../validation/product');
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../ulits/jwt');


// CREATE PRRODUCT
router.post('/', verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body);

    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct)
    } catch(err) {
        res.status(500). json(err)
    }
})



// UPDATE PRRODUCT


router.put('/:id',verifyTokenAndAdmin, async (req, res) => {

    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true }
        );
        res.status(200).json(updatedProduct)
    } catch (err) {
        res.status(500).json(err)
    }
})


// DELETE PRRODUCT


router.delete('/:id',verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json('Product has been deleted....')

    } catch (err) {
        res.status(500).json(err)
    }
})


// GET PRRODUCT

router.get('/find/:id', async (req, res) => {

    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch (err) {
        res.status(500).json(err)
    }
})


// GET ALL PRRODUCTS

router.get('/', async (req, res) => {
    const qNew = req.query.new;
     const qCart = req.body.category;
    try {
        let products;

        if(qNew){
            products = await Product.find().sort({createdAt: -1 }).limit(3);
         } else if (qCategory) {products = await Product.find({
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
})



module.exports = router;