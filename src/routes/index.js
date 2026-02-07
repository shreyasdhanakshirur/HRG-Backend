const express = require('express');
const router = express.Router();

router.use('/players', require('./players'));
router.use('/teams', require('./teams'));
router.use('/matches', require('./matches'));

module.exports = router;
