const PaymentMethod = require('../models/PaymentMethod');

const createPaymentMethod = async (req, res, next) => {
    try {
        const paymentMethod = new PaymentMethod(req.body);
        await paymentMethod.save();
        res.status(201).json(paymentMethod);
    } catch (error) {
        next(error);
    }
};

const getPaymentMethods = async (req, res, next) => {
    try {
        const paymentMethods = await PaymentMethod.find().populate('customer', 'name email');
        res.status(200).json(paymentMethods);
    } catch (error) {
        next(error);
    }
};

const getPaymentMethodById = async (req, res, next) => {
    try {
        const paymentMethod = await PaymentMethod.findById(req.params.id).populate('customer', 'name email');
        if (!paymentMethod) return res.status(404).json({ message: 'Payment method not found' });
        res.status(200).json(paymentMethod);
    } catch (error) {
        next(error);
    }
};

const updatePaymentMethod = async (req, res, next) => {
    try {
        const paymentMethod = await PaymentMethod.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!paymentMethod) return res.status(404).json({ message: 'Payment method not found' });
        res.status(200).json(paymentMethod);
    } catch (error) {
        next(error);
    }
};

const deletePaymentMethod = async (req, res, next) => {
    try {
        const paymentMethod = await PaymentMethod.findByIdAndDelete(req.params.id);
        if (!paymentMethod) return res.status(404).json({ message: 'Payment method not found' });
        res.status(200).json({ message: 'Payment method deleted' });
    } catch (error) {
        next(error);
    }
};

module.exports = { createPaymentMethod, getPaymentMethods, getPaymentMethodById, updatePaymentMethod, deletePaymentMethod };