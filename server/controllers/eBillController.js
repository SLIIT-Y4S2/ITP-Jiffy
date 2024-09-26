const User = require('../models/User')
const mongoose = require('mongoose')
const CART = require('../models/cart');
const InventoryProducts = require('../models/InventoryProducts');
const Order = require('../models/Order');
const Orderproduct = require('../models/orderedProduct');



var cusID;

// get all users
const getCartTotal = async (req, res) => {
    const bill = await CART.find({customer_id : req.params.cusID});
    console.log("bill");
    cusID=req.params.cusID
   var prod = [];
   var calculation =[];
   var final = [];
    console.log(bill.length)
    var i;
    
    for(i=0;i<bill.length;i++){
        
        prod.push (await InventoryProducts.findById(bill[i].Item_number));
    }
    var itemPrice;
    var total_amount=0;
    for(i=0;i<prod.length;i++){
        itemPrice = prod[i].unit_price*bill[i].quantity;
        total_amount+=itemPrice;
        calculation.push({ Item_Price : itemPrice});
    }
/*//creating order
         const order= new Order({
            CustomerID: cusID,
            Status : "Pending",
            Date : new Date().getDate(),
           
        });
    
       await order.save();
//get order ID
        var OID =[];
         OID.push(await Order.findOne({CustomerID: cusID}));

        const orderID = OID[0]._id;
        console.log(orderID);
*/
    for(i=0;i<prod.length;i++){
        final.push({
            product_ID : prod[i]._id,     
            product_Name : prod[i].product_name, 
            quantity : bill[i].quantity ,
            product_price : calculation[i].Item_Price , 
            total_Amount : total_amount,
           
            }
            );

            
           

    }
    

    //const kk = await product.findById("632b4b6777f3c2fcb5e9ae55");
    
    //const prod = await product.findById(bill.Item_number);
   // const plus = {arr1:bill , arr2:prod};


   
    res.json(final);
    
};

const getBuyNowTotal = async (req, res) => {
    const product = await InventoryProducts.findById(req.params.pid);
    console.log(product.product_name);
    var bill = [];
    var Quantity=req.params.qty;
    var Price = product.unit_price*Quantity;
    bill.push({product_ID: product._id , product_Name:product.product_name , quantity: Quantity ,product_price: Price,total_Amount:Price});
    res.json(bill);
}


module.exports = { 
    getCartTotal,
   
    getBuyNowTotal
}