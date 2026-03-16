const Transaction = require('../models/Transaction');

const createTransaction = async (req, res, next) => {
    try {
        const transaction = new Transaction(req.body);
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        next(error);
    }
};

const getTransactions = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const total = await Transaction.countDocuments();
        const transactions = await Transaction.find()
            .populate('customer', 'name email')
            .populate('paymentMethod', 'type last4')
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            data: transactions,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        next(error);
    }
};

const getTransactionById = async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id)
            .populate('customer', 'name email')
            .populate('paymentMethod', 'type last4');
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
        res.status(200).json(transaction);
    } catch (error) {
        next(error);
    }
};

const updateTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
        res.status(200).json(transaction);
    } catch (error) {
        next(error);
    }
};

module.exports = { createTransaction, getTransactions, getTransactionById, updateTransaction };