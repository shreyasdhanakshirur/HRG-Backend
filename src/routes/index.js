const express = require('express');
const router = express.Router();

// Public auth routes
router.use('/auth', require('./auth'));

// Protect all routes below this line
const authMiddleware = require('../middleware/auth');
router.use(authMiddleware);

router.use('/players', require('./players'));
router.use('/teams', require('./teams'));
router.use('/matches', require('./matches'));

module.exports = router;
