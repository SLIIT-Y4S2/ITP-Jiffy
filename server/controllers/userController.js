const User = require('../models/User')
const Order = require('../models/Order')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')
var sendEmail = require('../utils/sendEmail')

const {
    getAllCustomerOrders,
} = require('../controllers/orderController')

function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '2d' })
}

// get all users
const getUsers = async (req, res) => {
    const users = await User.find({}).sort({ lastLogin: -1 })

    res.status(200).json(users)
}

// get inactive users
const getOldUsers = async (req, res) => {
    const users = await User.find({}).sort({ lastLogin: -1 })
    var order = null
    var dataset = []
    var aindex = 0
    var count = 0
    const currentYear = new Date().getFullYear()

    users.forEach((element, index) => {
        //users[index].lastLogin = users[index].lastLogin.toISOString().split('T')[0]
        var year = users[index].lastLogin.toISOString().split('T')[0].slice(0, 4)
        order = Order.find({ CustomerID: users[index]._id })
        //console.log(month)
        console.log(year)
        if (currentYear - year >= 2 && order) {
            dataset.push({ _id: element._id, name: element.name, email: element.email, address: element.address, phone: element.phone })
        }
    });
    const grouped = groupBy(users, user => user.phone);
    res.status(200).json(dataset)

    //res.status(200).json(users)
}

// get account usage
const getAccountUsage = async (req, res) => {
    const users = await User.find({}).sort({ lastLogin: 0 })
    var dataset = []
    var found = false
    var aindex = 0
    var count = 0
    var first = true
    var currentYear = parseInt(new Date().getFullYear())

    var year = 0
    var previousMonth = 0
    var currentMonth = 0
    for(var month=1; month<=12; month++){
        if(month<10){
            dataset.push({ month: currentYear-1+"-0"+month, users: 0 })
        }else{
            dataset.push({ month: currentYear-1+"-"+month, users: 0 })
        }   
    }

    for(var month=1; month<=12; month++){
        if(month<10){
            dataset.push({ month: currentYear+"-0"+month, users: 0 })
        }else{
            dataset.push({ month: currentYear+"-"+month, users: 0 })
        }   
    }

    users.forEach((element, index) => {
        found = false
        //users[index].lastLogin = users[index].lastLogin.toISOString().split('T')[0]
        var year = users[index].lastLogin.toISOString().split('T')[0].slice(0, 4)
        var year_month = users[index].lastLogin.toISOString().split('T')[0].slice(0, 7)
        //console.log(month)

        dataset.forEach(function (obj, i) {
            if (obj.month == year_month) {
                found = true
                aindex = i
            }
        });

        if (currentYear - year < 2) {
            if (found) {
                count = dataset[aindex].users
                count += 1
                dataset[aindex].users = count
            } else {
                dataset.push({ month: year_month, users: 1 })
            }
        }
    });
    const grouped = groupBy(users, user => user.phone);
    res.status(200).json(dataset)
}

// get a single user
const getUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'User does not exsist' })
    }

    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({ error: 'User does not exsist' })
    }

    res.status(200).json(user)
}

// create new user
const createUser = async (req, res) => {
    const { name, email, address, phone, password } = req.body
    var isPhoneValid = /^[0-9,.]*$/.test(phone);

    if (!name || !email || !address || !phone || !password) {
        return res.status(400).json({ error: 'All fields must be filled', errorPosition: '1' })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Email is not valid', errorPosition: '2' })
    }
    if (await User.findOne({ email: { $eq: email } })) {
        return res.status(400).json({ error: 'Email already in use', errorPosition: '3' })
    }
    if (typeof phone !== 'string' || phone.length != 10 || !isPhoneValid) {
        return res.status(400).json({ error: 'Phone number is not valid', errorPosition: '4' })
    }
    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ error: 'Password not strong enough. Must contains uppercase, lowercase, numbers and more than eight characters', errorPosition: '5' })
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // add doc to db
    try {
        const user = await User.create({ name, email, address, phone, password: hash })
        sendEmail(email, 'Jiffy Account Created', `Your account has been created successfully. Email: ${email} Password: ${password}`)

        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

// create new user for google oauth process
let plainPassword;
const createGoogleUser = async (user) => {
    let returnedUser;

    const existingUsers = await User.find();
    const existingUser = (await Promise.all(existingUsers.map(async (existingUser) => { 
        const isExists = await bcrypt.compare(user.password, existingUser.password);
        return isExists ? existingUser : null;
    }))).find(user => user !== null);

      if (!existingUser) {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(user.password, salt)
        const newUser = await new User({...user, password: hash}).save();
        returnedUser = newUser;
        console.info("User saved");
      } else {
        returnedUser = existingUser;
        console.info("User already exists");
      }

    // Add plainPassword property to returnedUser
    returnedUser = returnedUser.toObject();
    plainPassword = user.password;
    return {...returnedUser, plainPassword};
};


const getGoogleUserById = async (id) => {
    let user = (await User.findById(id));
    user = user.toObject();
    return {...user, plainPassword};
};

// delete a user
const deleteUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'User does not exsist' })
    }

    const user = await User.findOneAndDelete({ _id: id })

    if (!user) {
        return res.status(404).json({ error: 'User does not exsist' })
    }
    sendEmail(user.email, 'Jiffy Account Deleted', 'Your account has been deleted successfully. If you need to use our services you need to re-create an account.')


    res.status(200).json(user)

}

// update a user
const updateUser = async (req, res) => {
    const { id } = req.params
    const { name, email, address, phone } = req.body
    var isPhoneValid = /^[0-9,.]*$/.test(phone);

    if (!name || !email || !address || !phone) {
        return res.status(400).json({ error: 'All fields must be filled' })
    }

    if(typeof name!='string' || typeof email!='string' || typeof address!='string' || typeof phone!='string'){
        return res.status(400).json({ error: 'Invalid data type' })
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

    var user = await User.findOne({ email: { $eq: email } })

    if (user._id != id) {
        return res.status(400).json({ error: 'Email already in use' })
    }

    user = await User.findOneAndUpdate({ _id: id }, {
        name,
        email,
        address,
        phone
    })

    if (!user) {
        return res.status(404).json({ error: 'User does not exsist' })
    }

    sendEmail(email, 'Jiffy Account Updated', 'Your account has been updated successfully. Thanks for using our services')


    res.status(200).json(user)
}

// login
const loginUser = async (req, res) => {
    let email = null;
    let password = null;
    let plainPassword = null;
    let user = null;

    try {
        if(req.user){
            email = req.user.email;
            plainPassword = req.user.plainPassword;
            user = await User.login(email, plainPassword)    
        } else {
            email = req.body.email;
            password = req.body.password;

            user = await User.login(email, password)
        }
    
        // create a token
        const token = createToken(user._id)
        const id = user._id

        if(req.user){
            res.cookie('cookie-session-user', JSON.stringify({ id, email, token, authType: "google" }));
            res.redirect("https://localhost:3000/account");
        }else{
            res.status(200).json({ id, email, token })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// signup user
const signupUser = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body

    try {
        const user = await User.signup(name, email, password, confirmPassword)
        const id = user._id
        // create a token
        const token = createToken(user._id)

        res.status(200).json({ id, email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// reset password
const resetPassword = async (req, res) => {
    const { id } = req.params
    const { currentPassword, newPassword, confirmPassword } = req.body

    if (!currentPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({ error: 'All fields must be filled' })
    }
    if (!(newPassword === confirmPassword)) {
        return res.status(400).json({ error: 'New password and confirm password mismatch' })
    }
    if (!validator.isStrongPassword(newPassword)) {
        return res.status(400).json({ error: 'Password not strong enough. Must contains uppercase, lowercase, numbers and more than eight characters' })
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'User does not exsist' })
    }

    var user = await User.findOne({ _id: id })

    if (!user) {
        return res.status(400).json({ error: 'User does not exsist' })
    }

    const match = await bcrypt.compare(currentPassword, user.password)

    if (!match) {
        return res.status(400).json({ error: 'Current password is incorrect' })
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(newPassword, salt)

    user = await User.findOneAndUpdate({ _id: id }, {
        password: hash,
    })

    if (!user) {
        return res.status(404).json({ error: 'User does not exsist' })
    }

    res.status(200).json(user)
}

const adminResetPassword = async (req, res) => {
    const { id } = req.params
    const { email, newPassword, confirmPassword } = req.body

    if (!newPassword || !confirmPassword) {
        return res.status(400).json({ error: 'All fields must be filled' })
    }
    if (!(newPassword === confirmPassword)) {
        return res.status(400).json({ error: 'New password and confirm password mismatch' })
    }
    if (!validator.isStrongPassword(newPassword)) {
        return res.status(400).json({ error: 'Password not strong enough. Must contains uppercase, lowercase, numbers and more than eight characters' })
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'User does not exsist' })
    }

    var user = await User.findOne({ _id: id })

    if (!user) {
        return res.status(400).json({ error: 'User does not exsist' })
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(newPassword, salt)

    user = await User.findOneAndUpdate({ _id: id }, {
        password: hash,
    })

    if (!user) {
        return res.status(404).json({ error: 'User does not exsist' })
    }
    sendEmail(email, 'Jiffy password reset', `Your account passwored has been reset. New password: ${newPassword}`)


    res.status(200).json(user)
}

module.exports = {
    createUser,
    getUsers,
    getUser,
    getOldUsers,
    deleteUser,
    updateUser,
    loginUser,
    signupUser,
    resetPassword,
    adminResetPassword,
    getAccountUsage,
    createGoogleUser,
    getGoogleUserById
}