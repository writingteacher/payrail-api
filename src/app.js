const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/auth');
const customerRoutes = require('./routes/customers');
const paymentMethodRoutes = require('./routes/paymentMethods');
const transactionRoutes = require('./routes/transactions');
const refundRoutes = require('./routes/refunds');

const app = express();

connectDB();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/payment-methods', paymentMethodRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/refunds', refundRoutes);
app.use(errorHandler);

module.exports = app;