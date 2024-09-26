const express = require('express')
const {
    createUser,
    getUsers,
    getOldUsers,
    getUser,
    deleteUser,
    updateUser,
    loginUser,
    signupUser,
    resetPassword,
    adminResetPassword,
    getAccountUsage
} = require('../controllers/userController')
const requireEmployee = require('../middleware/requireEmployee')

const router = express.Router()

// GET all users
router.get('/',requireEmployee, getUsers)

// GET inactive users
router.get('/old-users',requireEmployee, getOldUsers)

// GET account usage 
router.get('/usage', getAccountUsage)

// GET a single user
router.get('/:id', getUser)

// POST a new user
router.post('/',requireEmployee, createUser)

// DELETE a user
router.delete('/:id',requireEmployee, deleteUser)

// UPDATE a user
router.patch('/:id', updateUser)

// change password
router.patch('/reset-password/:id', resetPassword)

// admin change password
router.patch('/super-reset-password/:id', adminResetPassword)

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

module.exports = router