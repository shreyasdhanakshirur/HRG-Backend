const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/teamController');

router.post('/', ctrl.create);
router.get('/', ctrl.list);
router.get('/:id', ctrl.get);

module.exports = router;
