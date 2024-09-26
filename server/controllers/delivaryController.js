const User = require('../models/User')
const mongoose = require('mongoose')
const CART = require('../models/cart');
const Delivary = require('../models/delivary');


const delivaryCreate = async (req, res) => {
    const delivary = new Delivary({
        
        recieverName:req.body.recieverName,
        orderID:req.body.orderID,
        address:req.body.address,
        phoneNumber:req.body.phoneNumber
      
    });

    await delivary.save();
    
    res.json(delivary);
};



module.exports = { 
    delivaryCreate
    
}