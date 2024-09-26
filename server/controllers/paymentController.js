const User = require('../models/User')
const mongoose = require('mongoose')
const Payment = require('../models/payment');
var sendEmail = require('../utils/sendEmail')

const createPayment = async (req, res) => {
    const payment = new Payment({
        

        Customer_id:req.body.customer_id,
        Card_Number : req.body.number,
        Card_holder_name:req.body.name,
        Card_expiry_date:req.body.expiry,
        Card_CVC :req.body.cvc
    
    });
    
    await payment.save();
    sendEmail(req.body.email, 'Payment successfull', 'Your payment was completed successfully.')
    res.json(payment);
};

const getPayment = async (req, res) => {
    const payment = await Payment.findOne({Customer_id:req.params.cusID})
    
    res.json(payment);
    
};

const updatePayment = async (req, res) => {
    
    const payment = await Payment.findOneAndUpdate(
        {Customer_id:req.params.cusID},
        {
        Customer_id:req.body.customer_id,
        Card_Number : req.body.number,
        Card_holder_name:req.body.Hname,
        Card_expiry_date:req.body.expiry,
        Card_CVC :req.body.cvc
        },
        {new:true}
        );
        sendEmail(req.body.email, 'Payment successfull', 'Your payment was completed successfully.')
        res.json(payment);
};

const removePayment =async (req, res) => {
    const payment = await Payment.findOneAndDelete({Customer_id:req.params.cusID})
    res.json(payment);
};
module.exports = { 
    createPayment,
    getPayment,
    updatePayment,
    removePayment
}