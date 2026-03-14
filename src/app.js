const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const customerRoutes = require('./routes/customers');
const authRoutes = require('./routes/auth');

const app = express();

connectDB();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use(errorHandler);

module.exports = app;