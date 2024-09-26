const Machine = require("../models/Machine")
const MachineStats = require('../models/MachineStats')

// Create a new MachineStata
const createMachineStats = async (req, res) => {
    const {currentDate, mId, product, completedProducts, ranHrs} = req.body

    if (!mId || !currentDate || !product ||!completedProducts || !ranHrs) {
        return res.status(400).json({ error: 'All fields must be filled.' })
    }

    if (ranHrs < 3) {
        return res.status(400).json({ error: 'Ran hours cannot be less than 3.' })
    }

    if (completedProducts < 3) {
        return res.status(400).json({ error: 'Completed Products cannot be less than 26.' })
    }

    try {
        const machineStats = await MachineStats.create({mId, currentDate, product, completedProducts, ranHrs})
        await Machine.findOneAndUpdate({ mId: { $eq: mId } }, { $inc: {totalProductions: completedProducts, totalRunningHrs: ranHrs} })
        res.status(200).json(machineStats)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Get all MachineStats
const getAllMachineStats = async (req, res) => {
    const machineStats = await MachineStats.find();
    res.send(machineStats);
}


module.exports = { 
    createMachineStats,
    getAllMachineStats
}