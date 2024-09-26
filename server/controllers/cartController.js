const User = require('../models/User')
const mongoose = require('mongoose')

const CART = require('../models/cart');
const InventoryProducts = require('../models/InventoryProducts')

const createCart = async (req, res) => {
    const cart = new CART({
        customer_id: req.body.customer_id,
        Item_number : req.body.Item_number,
        quantity: req.body.quantity
    });

    await cart.save();
    res.json(cart);
};


const getCart = async (req, res) => {
    const cart = await CART.find({customer_id:req.params.cID , Item_number:req.params.pID});
    res.json(cart);
}

const getAllCart = async (req, res) => {
    const cart = await CART.find({customer_id:req.params.cID});
    var product = [];
    for (var i = 0; i < cart.length; i++) {
    product.push(await InventoryProducts.findById(cart[i].Item_number))
    }
    var final = [];
    console.log(product);
    for (let i = 0; i < cart.length; i++) {
        final.push({product_id:product[i]._id,product_name:product[i].product_name, unit_price:product[i].unit_price, quantity:cart[i].quantity})
    }
    res.json(final);

}

const updateCart= async (req, res) => {
    const cart = await CART.findOneAndUpdate(
        {Customer_id: { $eq: req.params.customerID }, Item_number: { $eq: req.params.productID }},
        {
            customer_id: req.body.customer_id,
            Item_number : req.body.Item_number,
            quantity: req.body.quantity
        },
        {new:true}
    );

    res.json(cart);
};

//Delete from cart
const deleteCart =async (req, res) => {
    const cart = await CART.findOneAndDelete({customer_id:req.params.customerID, Item_number:req.params.productID})
    res.json(cart);
};

module.exports = { 
 
    createCart,
    updateCart,
    getCart,
    getAllCart,
    deleteCart 
    
}