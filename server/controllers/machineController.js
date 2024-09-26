const Machine = require('../models/Machine')

// Create a new Machine
const createMachine = async (req, res) => {
    const {mId, maxRunningHrs, product, mFactory, installedDate} = req.body

    if (!mId || !maxRunningHrs || !product || !mFactory || !installedDate) {
        return res.status(400).json({ error: 'All fields must be filled.' })
    }

    if (await Machine.findOne({ mId: { $eq: mId } })) {
        return res.status(400).json({ error: 'Machine ID already exists.' })
    }

    if (typeof mId !== 'string' || mId.length < 6) {
        return res.status(400).json({ error: 'Machine ID must be a string and include at least 6 characters. Eg: XXX000' })
    }

    if (maxRunningHrs < 50) {
        return res.status(400).json({ error: 'Maximum running hours cannot be less than 50.' })
    }

    try {
        const machine = await Machine.create({mId, maxRunningHrs, product, mFactory, installedDate})
        res.status(200).json(machine)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Get all Machine
const getAllMachines = async (req, res) => {
    const factoryId = req.query.factory;
 
    if(factoryId){
        const machines = await Machine.find({mFactory: { $eq: factoryId }});
        res.json(machines);
    }else{
       const  machines = await Machine.find()
       res.json(machines);
    }
   
}

// Get Machines by factory IDs
const getMachinesByFId = async (req, res) => {
    const machine = await Machine.findByFId(req.params.mFactory);
    res.json(machine);
}

// Get a single Machine by its ID
const getMachine = async (req, res) => {
    const machine = await Machine.findById(req.params.id);
    res.json(machine);
}

// Delete a Machine
const deleteMachine = async (req, res) => {
    const machine = await Machine.findByIdAndDelete(req.params.id);
    res.json(machine);
} 

// Update a Machine
const updateMachine = async (req, res) => {

    const { id } = req.params
    const { mId, maxRunningHrs, product, mFactory, installedDate } = req.body

    if (!mId || !maxRunningHrs || !product || !mFactory || !installedDate) {
        return res.status(400).json({ error: 'All fields must be filled.' })
    }
    
    if (typeof mId !== 'string' || mId.length < 5) {
        return res.status(400).json({ error: 'Machine ID must be a string and include atleast 5 characters. Eg: XXX00' })
    }
    
    if (maxRunningHrs < 50) {
        return res.status(400).json({ error: 'Maximum running hours cannot be less than 50.' })
    }
    
    const machine = await Machine.findByIdAndUpdate({ _id: { $eq: id } }, {
            mId: { $eq: req.body.mId },
            //mName: { $eq: req.body.mName 
            maxRunningHrs: { $eq: req.body.maxRunningHrs },
            product: { $eq: req.body.product },
            mFactory: { $eq: req.body.mFactory },
            installedDate: { $eq: req.body.installedDate },
            totalProductions: { $eq: req.body.totalProductions },
            totalRunningHrs: { $eq: req.body.totalRunningHrs },
        })
    
    if (!machine) {
        return res.status(404).json({ error: 'Machine does not exsist' })
    }

    res.status(200).json(machine)
}

module.exports = { 
    createMachine,
    getAllMachines,
    getMachinesByFId,
    getMachine,
    deleteMachine,
    updateMachine,
}