const SupplierOrder = require('../models/supplierOrderModel')
const mongoose = require('mongoose')
var sendEmail = require('../utils/sendEmail')

//Create new order
const createSupplierOrder = async (req, res) => {
    const { supplierId, rawMaterial, quantity, unit } = req.body

    //adding to the db
    try {
        const order = await SupplierOrder.create({ supplierId, rawMaterial, quantity, unit })
        res.status(200).json(order)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//Get all orders
const getAllSupplierOrders = async (req, res) => {
    const orders = await SupplierOrder.find({}).sort({ createdAt: -1 })

    res.status(200).json(orders)
}

//Get unpaid orders
const getUnpaidSupplierOrders = async (req, res) => {
    const orders = await SupplierOrder.find({ orderStatus: "Pending" }).sort({ createdAt: -1 })

    res.status(200).json(orders)
}


//Get one orders

const getOneSupplierOrder = async (req, res) => {

    const order = await SupplierOrder.findById(req.params.id);

    res.send(order);
}

//Delete an order
const deleteSupplierOrder = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such order' })
    }

    const order = await SupplierOrder.findOneAndDelete({ _id: id })

    if (!order) {
        return res.status(400).json({ error: 'No such order' })
    }

    res.status(200).json(order)

}

//Update an order
const updateSupplierOrder = async (req, res) => {
    const order = await SupplierOrder.findById(req.params.id);

    if (order) {

        //order.deliveredAt = Date.now();
        order.orderStatus = "Received";
        order.Date = Date.now();

        const updatedOrder = await order.save();

        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }


}


const updateSupplierOrderPayment = async (req, res) => {

    const payment = await SupplierOrder.findByIdAndUpdate(req.params.id
        ,
        {
            supplierId: { $eq: req.body.supplierId },
            rawMaterial: { $eq: req.body.rawMaterial },
            quantity: { $eq: req.body.quantity },
            unit: { $eq: req.body.unit },
            orderStatus: { $eq: req.body.orderStatus }
        },
        { new: true }
    );
    sendEmail(req.body.email, 'Payment completed', `We have paid for your ${req.body.rawMaterial}`)
    res.send(payment);
};





module.exports = {
    createSupplierOrder,
    getAllSupplierOrders,
    getOneSupplierOrder,
    deleteSupplierOrder,
    updateSupplierOrder,
    updateSupplierOrderPayment,
    getUnpaidSupplierOrders



}