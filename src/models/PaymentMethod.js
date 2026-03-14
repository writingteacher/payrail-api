const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    type: {
        type: String,
        enum: ['card', 'bank_account'],
        required: true
    },
    last4: {
        type: String,
        required: true
    },
    expiryDate: {
        type: String
    },
    isDefault: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('PaymentMethod', paymentMethodSchema);