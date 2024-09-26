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
const { normalRateLimiter } = require('../rate-limiter')

const router = express.Router()

// GET all users
router.get('/', getUsers)

// GET inactive users
router.get('/old-users', getOldUsers)

// GET account usage 
router.get('/usage', getAccountUsage)

// GET a single user
router.get('/:id', getUser)

// POST a new user
router.post('/', createUser)

// DELETE a user
router.delete('/:id', deleteUser)

// UPDATE a user
router.patch('/:id', updateUser)

// change password
router.patch('/reset-password/:id', resetPassword)

// admin change password
router.patch('/super-reset-password/:id', adminResetPassword)

// login route
router.post('/login', normalRateLimiter, loginUser)

// signup route
router.post('/signup', signupUser)

module.exports = router