const Employee = require('../models/Employee')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const validator = require('validator')
var sendEmail = require('../utils/sendEmail')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '2d' })
}

// get all users
const getUsers = async (req, res) => {
    const employees = await Employee.find({}).sort({ lastLogin: -1 })

    res.status(200).json(employees)
}

// get a single user
const getUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'User does not exsist' })
    }

    const employee = await Employee.findById(id)

    if (!employee) {
        return res.status(404).json({ error: 'User does not exsist' })
    }

    res.status(200).json(employee)
}

// create new user
const createUser = async (req, res) => {
    const { name, email, dob,role,address, phone, password } = req.body
    var isPhoneValid = /^[0-9,.]*$/.test(phone);

    if (!name || !email || !dob || !role || !address || !phone || !password) {
        return res.status(400).json({ error: 'All fields must be filled' })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Email is not valid' })
    }
    if(await Employee.findOne({ email: { $eq: email } })){
        return res.status(400).json({ error: 'Email already in use' })
    }
    if (typeof phone !== 'string' || phone.length != 10 || !isPhoneValid) {
        return res.status(400).json({ error: 'Phone number is not valid' })
    }
    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ error: 'Password not strong enough. Must contains uppercase, lowercase, numbers and more than eight characters' })
    }

    // add doc to db
    try {
        const employee = await Employee.create({ name, email,dob,role, address, phone, password })
        sendEmail(email, 'Jiffy Account Created', `Your account has been created successfully. Email: ${email} Password: ${password}`)
        res.status(200).json(employee)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a user
const deleteUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'User does not exsist' })
    }

    const employee = await Employee.findOneAndDelete({ _id: id })

    if (!employee) {
        return res.status(404).json({ error: 'User does not exsist' })
    }

    res.status(200).json(employee)

}

// update a user
const updateUser = async (req, res) => {
    const { id } = req.params
    const { name, email,dob, role, address, phone} = req.body
    var isPhoneValid = /^[0-9,.]*$/.test(phone);

    if (!name || !email || !dob || !role || !address || !phone) {
        return res.status(400).json({ error: 'All fields must be filled' })
    }
    if (!validator.isEmail(req.body.email)) {
        return res.status(400).json({ error: 'Email is not valid' })
    }
    if (typeof phone !== 'string' || phone.length != 10 || !isPhoneValid) {
        return res.status(400).json({ error: 'Phone number is not valid' })
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'User does not exsist' })
    }

    const employee = await Employee.findOneAndUpdate({ _id: { $eq: id } }, {
        name: req.body.name,
        email: req.body.email,
        dob: req.body.dob,
        role: req.body.role,
        address: req.body.address,
        phone: req.body.phone
    })

    if (!employee) {
        return res.status(404).json({ error: 'User does not exsist' })
    }

    res.status(200).json(employee)
}

// login
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const employee = await Employee.login(email, password)

        // create a token
        const token = createToken(employee._id)
        const id = employee._id
        const role = employee.role

        res.status(200).json({ id, email,role, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// signup user
const signupUser = async (req, res) => {
    const { name, dob, role,address,phone, email, password } = req.body

    try {
        const employee = await Employee.signup(name,dob, role,address, phone, email, password)
        sendEmail(email, 'Jiffy Account Created', `Your account has been created successfully. Email: ${email} Password: ${password}`)
        const id = employee._id
        
        // create a token
        const token = createToken(employee._id)

        res.status(200).json({ id, email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    loginUser,
    signupUser
}