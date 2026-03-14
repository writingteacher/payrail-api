const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    createPaymentMethod,
    getPaymentMethods,
    getPaymentMethodById,
    updatePaymentMethod,
    deletePaymentMethod
} = require('../controllers/paymentMethodController');

router.post('/', auth, createPaymentMethod);
router.get('/', auth, getPaymentMethods);
router.get('/:id', auth, getPaymentMethodById);
router.put('/:id', auth, updatePaymentMethod);
router.delete('/:id', auth, deletePaymentMethod);

module.exports = router;