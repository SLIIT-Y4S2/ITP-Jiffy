const Factory = require('../models/Factory')

// Create a new Factory
const createFactory = async (req, res) => {
    const { fId, fName, fLocation, numOfEmployees, numOfMachines, numOfVehicles, createdDate } = req.body

    if (await Factory.findOne({ fId })) {
        return res.status(400).json({ error: 'Factory ID already exists.' })
    }

    if (typeof fId !== 'string' || fId.length < 6) {
        return res.status(400).json({ error: 'Factory ID must include at least 6 characters and be a string. Eg: XXX000' })
    }

    if (numOfEmployees < 0) {
        return res.status(400).json({ error: 'Number of Employees cannot be less than 0.' })
    }

    if (numOfMachines < 0) {
        return res.status(400).json({ error: 'Number of machines cannot be less than 0.' })
    }

    if (numOfVehicles < 0) {
        return res.status(400).json({ error: 'Number of Vehicles cannot be less than 0.' })
    }

    if (!fId || !fName || !fLocation || !numOfEmployees || !numOfMachines || !numOfMachines || !createdDate) {
        return res.status(400).json({ error: 'All fields must be filled.' })
    }

    try {
        const factory = await Factory.create({ fId, fName, fLocation, numOfEmployees, numOfMachines, numOfVehicles, createdDate })
        res.status(200).json(factory)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Get all Factories
const getAllFactories = async (req, res) => {
    const factory = await Factory.find();
    res.json(factory);
}

// Get a single Factory by its ID
const getFactory = async (req, res) => {
    const factory = await Factory.findById(req.params.id);
    res.json(factory);
}

// Delete a Factory
const deleteFactory = async (req, res) => {
    const factory = await Factory.findByIdAndDelete(req.params.id);
    res.json(factory);
}

// Update a Factory
const updateFactory = async (req, res) => {
    
    const { id } = req.params
    const { fId, fName, fLocation, numOfEmployees, numOfMachines, numOfVehicles, createdDate } = req.body

    if (!fId || !fName || !fLocation || !numOfEmployees || !numOfMachines || !numOfMachines || !createdDate) {
        return res.status(400).json({ error: 'All fields must be filled.' })
    }

    if (typeof fId !== 'string' || fId.length < 6) {
        return res.status(400).json({ error: 'Factory ID must include at least 6 characters and be a string. Eg: XXX000' })
    }

    if (numOfEmployees < 0) {
        return res.status(400).json({ error: 'Number of Employees cannot be less than 0.' })
    }

    if (numOfMachines < 0) {
        return res.status(400).json({ error: 'Number of machines cannot be less than 0.' })
    }

    if (numOfVehicles < 0) {
        return res.status(400).json({ error: 'Number of Vehicles cannot be less than 0.' })
    }

    const factory = await Factory.findByIdAndUpdate({ _id: id }, {
        fId: req.body.fId,
        fName: req.body.fName,
        fLocation: req.body.fLocation,
        numOfEmployees: req.body.numOfEmployees,
        numOfMachines: req.body.numOfMachines,
        numOfVehicles: req.body.numOfVehicles,
        createdDate: req.body.createdDate
    })

    if (!factory) {
        return res.status(404).json({ error: 'Factory does not exsist' })
    }

    res.status(200).json(factory)
}

module.exports = {
    createFactory,
    getAllFactories,
    getFactory,
    deleteFactory,
    updateFactory
}