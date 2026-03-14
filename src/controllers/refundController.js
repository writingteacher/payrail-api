const Refund = require('../models/Refund');

const createRefund = async (req, res, next) => {
    try {
        const refund = new Refund(req.body);
        await refund.save();
        res.status(201).json(refund);
    } catch (error) {
        next(error);
    }
};

const getRefunds = async (req, res, next) => {
    try {
        const refunds = await Refund.find()
            .populate('customer', 'name email')
            .populate('transaction', 'amount status');
        res.status(200).json(refunds);
    } catch (error) {
        next(error);
    }
};

const getRefundById = async (req, res, next) => {
    try {
        const refund = await Refund.findById(req.params.id)
            .populate('customer', 'name email')
            .populate('transaction', 'amount status');
        if (!refund) return res.status(404).json({ message: 'Refund not found' });
        res.status(200).json(refund);
    } catch (error) {
        next(error);
    }
};

const updateRefund = async (req, res, next) => {
    try {
        const refund = await Refund.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!refund) return res.status(404).json({ message: 'Refund not found' });
        res.status(200).json(refund);
    } catch (error) {
        next(error);
    }
};

module.exports = { createRefund, getRefunds, getRefundById, updateRefund };