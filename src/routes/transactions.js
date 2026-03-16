const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body } = require('express-validator');
const {
    createTransaction,
    getTransactions,
    getTransactionById,
    updateTransaction
} = require('../controllers/transactionController');

const validateTransaction = [
    body('customer').notEmpty().withMessage('Customer ID is required'),
    body('paymentMethod').notEmpty().withMessage('Payment method ID is required'),
    body('amount').isFloat({ gt: 0 }).withMessage('Amount must be a number greater than 0'),
    body('currency').isLength({ min: 3, max: 3 }).withMessage('Currency must be a 3-letter code')
];

router.post('/', auth, validateTransaction, createTransaction);
router.get('/', auth, getTransactions);
router.get('/:id', auth, getTransactionById);
router.put('/:id', auth, updateTransaction);

module.exports = router;