const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    createTransaction,
    getTransactions,
    getTransactionById,
    updateTransaction
} = require('../controllers/transactionController');

router.post('/', auth, createTransaction);
router.get('/', auth, getTransactions);
router.get('/:id', auth, getTransactionById);
router.put('/:id', auth, updateTransaction);

module.exports = router;