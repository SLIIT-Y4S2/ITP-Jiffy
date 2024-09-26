const express = require('express')
const {
    getPrivateSiteFeedbacks,
    getPublicSiteFeedbacks,
    createSiteFeedback,
    deleteSiteFeedback,
    updatePublicSiteFeedback,
    updatePrivateSiteFeedback
} = require('../controllers/siteFeedbackController')
const { doubleCsrfProtection } = require('../controllers/csrf-controller')

const router = express.Router()

// GET all private feedbacks
router.get('/private', getPrivateSiteFeedbacks)

// GET all public feedbacks
router.get('/public', getPublicSiteFeedbacks)

// POST a new feedback
router.post('/', doubleCsrfProtection, createSiteFeedback)

// DELETE a feedback
router.delete('/:id', deleteSiteFeedback)

// UPDATE feedback to public
router.patch('/public', updatePublicSiteFeedback)

// UPDATE feedback to private
router.patch('/private', updatePrivateSiteFeedback)

module.exports = router