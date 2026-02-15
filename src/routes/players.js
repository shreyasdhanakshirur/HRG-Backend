const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/playerController');

router.post('/', ctrl.create);
router.get('/', ctrl.list);
router.get('/:id', ctrl.get);
router.post('/seed',ctrl.seed)


module.exports = router;
