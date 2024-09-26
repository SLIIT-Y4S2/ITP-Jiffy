const { json } = require("express");
const SupplierPayment = require("../models/SupplierPayment");

//* Create new supplier payment 
const newSupplierPayment = async (req, res) => {
    console.log(req.body.transactionDate);
    const newSupplierPayment = new SupplierPayment({
        supplierName: req.body.supplierName,
        supplierID: req.body.supplierId,
        orderID: req.body.order_ID,
        amount: req.body.amount,
        transactionDate: req.body.transactionDate,
        paymentReferenceNo: req.body.paymentReferenceNo,
        fileName: req.body.fileName
        
    });await newSupplierPayment.save();
    res.json(newSupplierPayment);

 /*   newSupplierPayment
        .save()
        .then(supplierPayment => res.status(200).json(supplierPayment))
        .catch(error => res.status(400).json({ error: error.message }));
*/
};


//* all supplier payments
const allSupplierPayments = async (req, res) => {
    const sample = await SupplierPayment.find().sort({transactionDate: -1})
    ;
    var array=[];
    for(i=0;i<sample.length;i++) {    
    var test = sample[i].transactionDate.toISOString().split('T')[0].slice(0, 10);
    
    array.push({_id:sample[i]._id,
               supplierName:sample[i].supplierName,
               supplierID:sample[i].supplierID,
               orderID:sample[i].orderID,
               amount:sample[i].amount,
               transactionDate:test,
               paymentReferenceNo:sample[i].paymentReferenceNo,
               fileName:sample[i].fileName},
         
                             
               );
    
   
    }
    res.send(array);
};

//* one supplier payments
const oneSupplierPayments = async (req, res) => {
    const sample = await SupplierPayment.findById(req.params.ID)
    ;
  
   
    
    res.send(sample);
};

//*
const getPaymentData = async (req, res) => {
    await SupplierPayment.aggregate()
        .group({
            _id: "$supplierName",
            Total: {
                $sum: "$amount"
            }
        })
        .sort({
            _id: 'asc'
        })
        .then(paymentData => res.json(paymentData))
        .catch(error => res.json({ error: error.message }));
};

const getPaymentDataBySupplier = async (req, res) => {
    await SupplierPayment
        .aggregate()
        .match(
            {
                supplierName: req.params.name
            }
        )
        .then(paymentData => res.status(200).json(paymentData))
        .catch(error => res.status(400).json({ error: error.message }))
};

//*Get recently added suppliers
const getRecentPayments = async (req, res) => {
    await SupplierPayment
        .find({}, { supplierName : 1, amount : 1, createdAt : 1, _id : 1, paymentReferenceNo:1 })
        .sort({ createdAt: "asc" })
        .limit(5)
        .then(payments => res.status(200).json(payments))
        .catch(error => res.status(400).json(error));
};

const getOutcomeOverview = async (req, res) => {
    

    var sendData = [];

    var currentYear = parseInt(new Date().getFullYear())
    
    var year = currentYear;
    var month = parseInt(new Date().getMonth() + 1);

    var tempYear;
    var tempMonth
    var yrPasses = false;
    var Nmonth;
    while (currentYear - year < 2) {
        Nmonth = 12;
        if (yrPasses == false) {
            while (month >= 1) {
                var history = await SupplierPayment.find();
                var Tamount = 0;
                for (i = 0; i < history.length; i++) {
                    tempYear = parseInt(history[i].transactionDate.getFullYear());
                    tempMonth = parseInt(history[i].transactionDate.getMonth() + 1);

                    if (year == tempYear && tempMonth == month) {
                   
                        Tamount += history[i].amount;
                    }
                }

                sendData.push({ date: year + "-" + month, outcome: Tamount })
                month--;
            } yrPasses = true;
            year--;
        } else {
            while (Nmonth >= 1) {

                var history = await SupplierPayment.find();
                var Tamount = 0;
                for (i = 0; i < history.length; i++) {
                    tempYear = parseInt(history[i].transactionDate.getFullYear());
                    tempMonth = parseInt(history[i].transactionDate.getMonth() + 1);

                    if (year == tempYear && tempMonth == Nmonth) {
                    
                        Tamount += history[i].amount;
                    }
                }

                sendData.push({ date: year + "-" + Nmonth, outcome: Tamount })
                Nmonth--;
            } yrPasses = true;
            year--;
        }


    }
    res.send(sendData);
}



module.exports = {
    newSupplierPayment,
    allSupplierPayments,
    getPaymentData,
    getPaymentDataBySupplier,
    getRecentPayments,
    oneSupplierPayments,
    getOutcomeOverview 
};