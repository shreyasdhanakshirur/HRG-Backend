const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/matchController');

router.post('/', ctrl.create);
router.get('/', ctrl.list);
router.get('/:id', ctrl.get);
router.post('/:matchId/toss', ctrl.toss);
router.post('/:id/start', ctrl.start);
router.post('/:matchId/deliveries', ctrl.addDelivery);
router.get('/:matchId/summary', ctrl.summary);

module.exports = router;
