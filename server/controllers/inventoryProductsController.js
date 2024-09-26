//inventory controller for products and raw materials

/*Products */
const InventoryProducts = require('../models/InventoryProducts')
const mongoose = require('mongoose')

//CREATE a product
const createProduct = async (req, res) => {
    const {product_name, unit_price, reorder_level, weight_per_unit, units_in_stock, description, photo} = req.body

    //validations when creating a new product - checks if the product already exists
    if(await InventoryProducts.findOne({product_name})){
        return res.status(400).json({ error: 'The product already exists' })
    }

    // add details to db
    try{
        const product = await InventoryProducts.create({product_name, unit_price, reorder_level, weight_per_unit, units_in_stock, description, photo})
        res.status(200).json(product)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
} 

//Read details of all products
const getAllProducts = async (req, res) => {
    await InventoryProducts.find()
        .then((allProducts) => res.status(200).json(allProducts));
};

//READ details of a single product by id
const getProduct = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Product does not exist'})
    }

    const product = await InventoryProducts.findById(id)

    if(!product) {
        return res.status(404).json({error: 'Product does not exist'})
    }

    res.status(200).json(product)
}


//UPDATE details of a single product
const updateProduct = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Product does not exist'})
    }

    const product = await InventoryProducts.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!product) {
        return res.status(404).json({error: 'Product does not exist'})
    }

    res.status(200).json(product)
}

//DELETE a single product
const deleteProduct = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Product does not exist'})
    }

    const product = await InventoryProducts.findOneAndDelete({_id: id})

    if(!product) {
        return res.status(404).json({error: 'Product does not exist'})
    }

    res.status(200).json(product)

} 


const updateQuantity = async(req, res)=>{
    const product = await InventoryProducts.findByIdAndUpdate(
        req.params.id,
        {
            units_in_stock:req.body.tempQuantity

        },
    {new:true}
    );

    res.json(product);
}

module.exports = { 
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getAllProducts,
    updateQuantity

}