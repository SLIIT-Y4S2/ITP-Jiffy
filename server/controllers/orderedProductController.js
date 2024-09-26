const mongoose = require('mongoose')

const orderedProducts = require('../models/orderedProduct');


const Create = async (req, res) => {
    const orderedProduct = new orderedProducts({
        OrderID: req.body.order_ID,
        ProductID: req.body.product_id,
        Quantity: req.body.quantity,
        product_Name: req.body.product_Name

    });

    await orderedProduct.save();
    res.json(orderedProduct);
};

//Get product by order ID

const getProductByOrderId = async (req, res) => {
    const orderedProduct = await orderedProducts.find({ OrderID: req.params.id });
    res.status(200).json(orderedProduct)

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ error: 'No such order' })
    }

}

//Get number of orders for a product

const getNumberOfOrdersForProduct = async (req, res) => {
    await orderedProducts.aggregate()
        .group({
            _id: "$product_Name",
            Total: {
                $count: {}
            }
        })
        .then(productOrders => res.json(productOrders))
        .catch(error => res.json({ error: error.message }));
};

//Get products sold count in orders

const getProductsSoldCount = async (req, res) => {
    await orderedProducts.aggregate()
        .group({
            _id: "$product_Name",
            Total: {
                $sum: "$Quantity"
            }
        })
        .sort({
            _id: 1
        })
        .then(productOrders => res.json(productOrders))
        .catch(error => res.json({ error: error.message }));
};


module.exports = {
    Create,
    getProductByOrderId,
    getNumberOfOrdersForProduct,
    getProductsSoldCount
}