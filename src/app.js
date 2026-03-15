const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/auth');
const customerRoutes = require('./routes/customers');
const paymentMethodRoutes = require('./routes/paymentMethods');
const transactionRoutes = require('./routes/transactions');
const refundRoutes = require('./routes/refunds');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
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