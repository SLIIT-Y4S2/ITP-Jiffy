const InventoryRaw = require("../models/InventoryRawMaterials")
const RawData = require('../models/RawData')

// Create a new RawData
const createRawData = async (req, res) => {
    const {currentDate, fId, rawMaterial, noOfRaws} = req.body

    if (!currentDate || !fId || !rawMaterial || !noOfRaws) {
        return res.status(400).json({ error: 'All fields must be filled.' })
    }

    // if (completedProducts < 3) {
    //     return res.status(400).json({ error: 'Number of Raw Material used cannot be less than 20.' })
    // } 

    try {
        const response = await RawData.create({currentDate, fId, rawMaterial, NoOfRaws: noOfRaws})
        await InventoryRaw.findOneAndUpdate({ raw_material_name: { $eq: rawMaterial } }, { $inc: {qty_in_stock: -noOfRaws} })
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { 
    createRawData,
}