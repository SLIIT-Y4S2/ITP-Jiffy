
const express = require('express');
const { generateCsrfToken } = require('../controllers/csrf-controller');

const router = express.Router()

router.get("/generate", generateCsrfToken);

module.exports = router
