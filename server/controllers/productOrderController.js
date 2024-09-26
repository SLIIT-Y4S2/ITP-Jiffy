const ProductOrder = require('../models/productOrder')
const mongoose = require('mongoose');

// Get all product Orders
const getAllproductOrders = async (req, res) => {
    const productOrder = await ProductOrder.find();
    res.json(productOrder);
}

// Update a product order
const updateProductOrders = async (req, res) => {

    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {


        return res.status(400).json({ error: 'Invalid product order ID' });
    }

    if (typeof status !== 'string') {
        return res.status(400).json({ error: 'Invalid status value' });
    }

    const productOrder = await ProductOrder.findByIdAndUpdate({ _id: { $eq: id } }, {
        status: status
    })



    if (!productOrder) {
        return res.status(404).json({ error: 'Poduct Order does not exsist' })
    }

    res.status(200).json(productOrder)
}


module.exports = {
    getAllproductOrders,
    updateProductOrders
}