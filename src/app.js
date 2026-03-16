const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/auth');
const customerRoutes = require('./routes/customers');
const paymentMethodRoutes = require('./routes/paymentMethods');
const transactionRoutes = require('./routes/transactions');
const refundRoutes = require('./routes/refunds');
const rateLimit = require('express-rate-limit');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // max 100 requests per IP per window
    message: { message: 'Too many requests, please try again later.' }
});

app.use('/api/', limiter);
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/payment-methods', paymentMethodRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/refunds', refundRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Payrail API', version: '1.0.0' });
});

app.use(errorHandler);

module.exports = app;