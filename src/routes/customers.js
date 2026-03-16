const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body } = require('express-validator');
const {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
} = require('../controllers/customerController');

const validateCustomer = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').notEmpty().withMessage('Phone is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

router.post('/', auth, validateCustomer, createCustomer);
router.get('/', auth, getCustomers);
router.get('/:id', auth, getCustomerById);
router.put('/:id', auth, updateCustomer);
router.delete('/:id', auth, deleteCustomer);

module.exports = router;