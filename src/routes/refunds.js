const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    createRefund,
    getRefunds,
    getRefundById,
    updateRefund
} = require('../controllers/refundController');

router.post('/', auth, createRefund);
router.get('/', auth, getRefunds);
router.get('/:id', auth, getRefundById);
router.put('/:id', auth, updateRefund);

module.exports = router;