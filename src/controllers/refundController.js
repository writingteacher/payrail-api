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
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const total = await Refund.countDocuments();
        const refunds = await Refund.find()
            .populate('customer', 'name email')
            .populate('transaction', 'amount status')
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            data: refunds,
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