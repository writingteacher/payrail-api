# Quickstart

Get up and running with the Payrail API in minutes. This guide walks you through registering a customer, adding a payment method, and creating your first transaction.

## Base URL
```
https://payrail-api.onrender.com
```

---

## Step 1 — Register a customer

Send a `POST` request to create a new customer account. This returns a JWT token you'll use for all subsequent requests.

**Request**
```
POST /api/auth/register
```
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "555-1234",
    "password": "password123"
}
```

**Response**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "customer": {
        "_id": "69b5330a4314418540e8676e",
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "555-1234",
        "createdAt": "2026-03-14T10:06:02.079Z"
    }
}
```

Copy the `token` value — you'll need it for every request going forward.

---

## Step 2 — Add a payment method

Add a card or bank account for the customer. Use the `_id` from the register response as the `customer` value.

**Request**
```
POST /api/payment-methods
Authorization: Bearer <token>
```
```json
{
    "customer": "69b5330a4314418540e8676e",
    "type": "card",
    "last4": "4242",
    "expiryDate": "12/28",
    "isDefault": true
}
```

**Response**
```json
{
    "_id": "69b53559c707c55a4e351409",
    "customer": "69b5330a4314418540e8676e",
    "type": "card",
    "last4": "4242",
    "expiryDate": "12/28",
    "isDefault": true,
    "createdAt": "2026-03-14T10:15:53.050Z"
}
```

Copy the `_id` value — you'll need it for the transaction.

---

## Step 3 — Create a transaction

Process a payment using the customer and payment method IDs from the previous steps.

**Request**
```
POST /api/transactions
Authorization: Bearer <token>
```
```json
{
    "customer": "69b5330a4314418540e8676e",
    "paymentMethod": "69b53559c707c55a4e351409",
    "amount": 150.00,
    "currency": "USD",
    "description": "Payment for services"
}
```

**Response**
```json
{
    "_id": "69b536d0bcfe7db4d09c1403",
    "customer": "69b5330a4314418540e8676e",
    "paymentMethod": "69b53559c707c55a4e351409",
    "amount": 150,
    "currency": "USD",
    "status": "pending",
    "description": "Payment for services",
    "createdAt": "2026-03-14T10:22:08.804Z"
}
```

---

## Step 4 — Request a refund

If needed, create a refund for the transaction.

**Request**
```
POST /api/refunds
Authorization: Bearer <token>
```
```json
{
    "customer": "69b5330a4314418540e8676e",
    "transaction": "69b536d0bcfe7db4d09c1403",
    "amount": 150.00,
    "reason": "Customer requested refund"
}
```

**Response**
```json
{
    "_id": "69b537548386681aea83bfd2",
    "customer": "69b5330a4314418540e8676e",
    "transaction": "69b536d0bcfe7db4d09c1403",
    "amount": 150,
    "reason": "Customer requested refund",
    "status": "pending",
    "createdAt": "2026-03-14T10:24:20.638Z"
}
```

---

## Next steps

- Explore the full [API Reference](api-reference.md) for all available endpoints
- Learn about [Authentication](authentication.md) and how JWT tokens work