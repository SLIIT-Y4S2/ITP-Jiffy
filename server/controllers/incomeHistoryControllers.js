const User = require('../models/User')
const income = require('../models/incomeHistory')
const mongoose = require('mongoose')


const insert = async (req, res) => {
    const history = new income({

        Order_id: req.body.order_ID,
        total_Amount: req.body.total,


    });

    await history.save();

    res.json(history);
};

const getIncomeOverview = async (req, res) => {
    

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
                var history = await income.find();
                var amount = 0;
                for (i = 0; i < history.length; i++) {
                    tempYear = parseInt(history[i].Date.getFullYear());
                    tempMonth = parseInt(history[i].Date.getMonth() + 1);

                    if (year == tempYear && tempMonth == month) {
                   
                        amount += history[i].total_Amount;
                    }
                }

                sendData.push({ date: year + "-" + month, income: amount })
                month--;
            } yrPasses = true;
            year--;
        } else {
            while (Nmonth >= 1) {

                var history = await income.find();
                var amount = 0;
                for (i = 0; i < history.length; i++) {
                    tempYear = parseInt(history[i].Date.getFullYear());
                    tempMonth = parseInt(history[i].Date.getMonth() + 1);

                    if (year == tempYear && tempMonth == Nmonth) {
                    
                        amount += history[i].total_Amount;
                    }
                }

                sendData.push({ date: year + "-" + Nmonth, income: amount })
                Nmonth--;
            } yrPasses = true;
            year--;
        }


    }


  
    res.json(sendData);


};



module.exports = {
    insert,
    getIncomeOverview

}