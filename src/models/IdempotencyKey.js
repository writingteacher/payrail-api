const mongoose = require('mongoose');

const idempotencyKeySchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    response: {
        type: Object,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // auto-delete after 24 hours
    }
});

module.exports = mongoose.model('IdempotencyKey', idempotencyKeySchema);