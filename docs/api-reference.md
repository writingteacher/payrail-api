# Payrail API Reference

## HTTP status codes

Payrail uses standard HTTP status codes to indicate the success or failure of a request.

| Code | Status | Description |
|------|--------|-------------|
| 200 | OK | The request was successful |
| 201 | Created | A new resource was successfully created |
| 400 | Bad Request | The request was malformed or missing required fields |
| 401 | Unauthorized | Missing or invalid authentication token |
| 404 | Not Found | The requested resource does not exist |
| 500 | Internal Server Error | An unexpected error occurred on the server |

## Error responses

All errors return a JSON object with a `message` field describing the error.

**Example error response**
```json
{
    "message": "Customer not found"
}
```

| Error message | Status code | Cause |
|---------------|-------------|-------|
| `Authentication required` | 401 | Missing or invalid JWT token |
| `Email already registered` | 400 | Registration attempted with an existing email |
| `Invalid credentials` | 400 | Login attempted with wrong email or password |
| `Customer not found` | 404 | No customer matches the provided ID |
| `Payment method not found` | 404 | No payment method matches the provided ID |
| `Transaction not found` | 404 | No transaction matches the provided ID |
| `Refund not found` | 404 | No refund matches the provided ID |
| `Internal Server Error` | 500 | Unexpected server error |

---

## Authentication

All endpoints except `/api/auth/register` and `/api/auth/login` require a valid JWT token in the request header.
```
Authorization: Bearer <token>
```

---

## Auth

### Register a customer

Creates a new customer account and returns a JWT token.

**Endpoint**
```
POST /api/auth/register
```

**Request body**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Customer's full name |
| email | string | Yes | Customer's email address |
| phone | string | No | Customer's phone number |
| password | string | Yes | Customer's password |

**Example request**
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "555-1234",
    "password": "password123"
}
```

**Example response**
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

---

### Log in

Authenticates an existing customer and returns a JWT token.

**Endpoint**
```
POST /api/auth/login
```

**Request body**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | Customer's email address |
| password | string | Yes | Customer's password |

**Example request**
```json
{
    "email": "john@example.com",
    "password": "password123"
}
```

**Example response**
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
---

## Customers

### Create a customer

Creates a new customer profile.

**Endpoint**
```
POST /api/customers
```

**Headers**
```
Authorization: Bearer <token>
```

**Request body**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Customer's full name |
| email | string | Yes | Customer's email address |
| phone | string | No | Customer's phone number |
| password | string | Yes | Customer's password |

**Example request**
```json
{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "555-5678",
    "password": "password123"
}
```

**Example response**
```json
{
    "_id": "69b533dc4314418540e86770",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "555-5678",
    "createdAt": "2026-03-14T10:09:32.311Z"
}
```

---

### List all customers

Returns a list of all customers.

**Endpoint**
```
GET /api/customers
```

**Headers**
```
Authorization: Bearer <token>
```
> **Note:** Password fields are never returned in any customer response.

**Example response**
```json
[
    {
        "_id": "69b533dc4314418540e86770",
        "name": "Jane Doe",
        "email": "jane@example.com",
        "phone": "555-5678",
        "createdAt": "2026-03-14T10:09:32.311Z"
    }
]
```

---

### Retrieve a customer

Returns a single customer by ID.

**Endpoint**
```
GET /api/customers/:id
```

**Headers**
```
Authorization: Bearer <token>
```

**Path parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | The customer's unique ID |

**Example response**
```json
{
    "_id": "69b533dc4314418540e86770",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "555-5678",
    "createdAt": "2026-03-14T10:09:32.311Z"
}
```

---

### Update a customer

Updates an existing customer's details.

**Endpoint**
```
PUT /api/customers/:id
```

**Headers**
```
Authorization: Bearer <token>
```

**Path parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | The customer's unique ID |

**Request body**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | No | Customer's full name |
| email | string | No | Customer's email address |
| phone | string | No | Customer's phone number |

**Example request**
```json
{
    "phone": "555-9999"
}
```

**Example response**
```json
{
    "_id": "69b533dc4314418540e86770",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "555-9999",
    "createdAt": "2026-03-14T10:09:32.311Z"
}
```

---

### Delete a customer

Deletes a customer by ID.

**Endpoint**
```
DELETE /api/customers/:id
```

**Headers**
```
Authorization: Bearer <token>
```

**Path parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | The customer's unique ID |

**Example response**
```json
{
    "message": "Customer deleted"
}
```
Now paste the Payment Methods section below the Customers section:

```markdown
---

## Payment Methods

### Create a payment method

Adds a new payment method for a customer.

**Endpoint**

```
POST /api/payment-methods
```

**Headers**

```
Authorization: Bearer <token>

**Request body**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| customer | string | Yes | The customer's unique ID |
| type | string | Yes | Payment type — `card` or `bank_account` |
| last4 | string | Yes | Last 4 digits of the card or account number. For display purposes only — full card numbers are never stored |
| expiryDate | string | No | Expiry date in MM/YY format |
| isDefault | boolean | No | Set as default payment method |

**Example request**

```json
{
    "customer": "69b5330a4314418540e8676e",
    "type": "card",
    "last4": "4242",
    "expiryDate": "12/28",
    "isDefault": true
}

```

**Example response**

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

---

### List all payment methods

Returns a list of all payment methods.

**Endpoint**

```
GET /api/payment-methods
```

**Headers**

```
Authorization: Bearer <token>
```

**Example response**

```json
[
    {
        "_id": "69b53559c707c55a4e351409",
        "customer": {
            "_id": "69b5330a4314418540e8676e",
            "name": "John Doe",
            "email": "john@example.com"
        },
        "type": "card",
        "last4": "4242",
        "expiryDate": "12/28",
        "isDefault": true,
        "createdAt": "2026-03-14T10:15:53.050Z"
    }
]
```

---

### Retrieve a payment method

Returns a single payment method by ID.

**Endpoint**

```
GET /api/payment-methods/:id
```

**Headers**

```
Authorization: Bearer <token>
```

**Path parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | The payment method's unique ID |

**Example response**

```json
{
    "_id": "69b53559c707c55a4e351409",
    "customer": {
        "_id": "69b5330a4314418540e8676e",
        "name": "John Doe",
        "email": "john@example.com"
    },
    "type": "card",
    "last4": "4242",
    "expiryDate": "12/28",
    "isDefault": true,
    "createdAt": "2026-03-14T10:15:53.050Z"
}
```

---

### Update a payment method

Updates an existing payment method.

**Endpoint**

```
PUT /api/payment-methods/:id
```

**Headers**

```
Authorization: Bearer <token>
```

**Path parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | The payment method's unique ID |

**Request body**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| isDefault | boolean | No | Set as default payment method |
| expiryDate | string | No | Updated expiry date in MM/YY format |

**Example request**

```json
{
    "isDefault": false
}
```

**Example response**

```json
{
    "_id": "69b53559c707c55a4e351409",
    "customer": "69b5330a4314418540e8676e",
    "type": "card",
    "last4": "4242",
    "expiryDate": "12/28",
    "isDefault": false,
    "createdAt": "2026-03-14T10:15:53.050Z"
}
```

---

### Delete a payment method

Deletes a payment method by ID.

**Endpoint**

```
DELETE /api/payment-methods/:id
```

**Headers**

```
Authorization: Bearer <token>
```

**Path parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | The payment method's unique ID |

**Example response**

```json
{
    "message": "Payment method deleted"
}
```
---

## Transactions

## Transaction status lifecycle

Transaction statuses are system-driven and follow a strict lifecycle. Statuses cannot be set arbitrarily — they reflect the actual state of the payment.
```
pending → completed   (successful payment)
pending → failed      (bank decline)
completed → refunded  (full refund processed)
```

| Status | Description |
|--------|-------------|
| `pending` | Transaction has been created and is awaiting processing |
| `completed` | Payment was successfully processed |
| `failed` | Payment was declined by the bank |
| `refunded` | Payment has been fully refunded |

> **Note:** The `PUT /api/transactions/:id` endpoint is intended for system use only. In production, transaction statuses are updated automatically by the payment processor.


### Create a transaction

Creates a new payment transaction.

**Endpoint**
```
POST /api/transactions
```

**Headers**
```
Authorization: Bearer <token>
Idempotency-Key: <unique-key>
```

> **Note:** The `Idempotency-Key` header is required for all `POST` requests to `/api/transactions`. If a request is retried with the same key, the API returns the original response rather than creating a duplicate transaction. Use a UUID or other unique string.
```

**Request body**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| customer | string | Yes | The customer's unique ID |
| paymentMethod | string | Yes | The payment method's unique ID |
| amount | number | Yes | Transaction amount |
| currency | string | No | 3-letter ISO 4217 currency code (e.g., USD, EUR, GBP). Defaults to USD. |
| status | string | No | Transaction status — `pending`, `completed`, or `failed` |
| description | string | No | Description of the transaction |

**Example request**
```json
{
    "customer": "69b5330a4314418540e8676e",
    "paymentMethod": "69b53559c707c55a4e351409",
    "amount": 15000,
    "currency": "USD",
    "status": "completed",
    "description": "Payment for services"
}
```

**Example response**
```json
{
    "_id": "69b536d0bcfe7db4d09c1403",
    "customer": "69b5330a4314418540e8676e",
    "paymentMethod": "69b53559c707c55a4e351409",
    "amount": 15000,
    "currency": "USD",
    "status": "completed",
    "description": "Payment for services",
    "createdAt": "2026-03-14T10:22:08.804Z"
}
```

---

### List all transactions

Returns a list of all transactions.

**Endpoint**
```
GET /api/transactions
```

**Headers**
```
Authorization: Bearer <token>
```
**Query parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| limit | integer | No | Number of transactions to return. Defaults to 10, maximum 100. |
| offset | integer | No | Number of transactions to skip. Use for pagination. |

**Example request**
```
GET /api/transactions?limit=10&offset=0
```

**Example response**
```json
[
    {
        "_id": "69b536d0bcfe7db4d09c1403",
        "customer": {
            "_id": "69b5330a4314418540e8676e",
            "name": "John Doe",
            "email": "john@example.com"
        },
        "paymentMethod": {
            "_id": "69b53559c707c55a4e351409",
            "type": "card",
            "last4": "4242"
        },
        "amount": 15000,
        "currency": "USD",
        "status": "completed",
        "description": "Payment for services",
        "createdAt": "2026-03-14T10:22:08.804Z"
    }
]
```

---

### Retrieve a transaction

Returns a single transaction by ID.

**Endpoint**
```
GET /api/transactions/:id
```

**Headers**
```
Authorization: Bearer <token>
```

**Path parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | The transaction's unique ID |

**Example response**
```json
{
    "_id": "69b536d0bcfe7db4d09c1403",
    "customer": {
        "_id": "69b5330a4314418540e8676e",
        "name": "John Doe",
        "email": "john@example.com"
    },
    "paymentMethod": {
        "_id": "69b53559c707c55a4e351409",
        "type": "card",
        "last4": "4242"
    },
    "amount": 15000,
    "currency": "USD",
    "status": "completed",
    "description": "Payment for services",
    "createdAt": "2026-03-14T10:22:08.804Z"
}
```

---

### Update a transaction

Updates an existing transaction's status.

**Endpoint**
```
PUT /api/transactions/:id
```

**Headers**
```
Authorization: Bearer <token>
```

**Path parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | The transaction's unique ID |

**Request body**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| status | string | No | Updated status — `pending`, `completed`, or `failed` |
| description | string | No | Updated description |

**Example request**
```json
{
    "status": "failed"
}
```

**Example response**
```json
{
    "_id": "69b536d0bcfe7db4d09c1403",
    "customer": "69b5330a4314418540e8676e",
    "paymentMethod": "69b53559c707c55a4e351409",
    "amount": 15000,
    "currency": "USD",
    "status": "failed",
    "description": "Payment for services",
    "createdAt": "2026-03-14T10:22:08.804Z"
}
```
---

## Refunds

### Create a refund

Creates a new refund request for a transaction.

**Endpoint**
```
POST /api/refunds
```

**Headers**
```
Authorization: Bearer <token>
Idempotency-Key: <unique-key>
```

> **Note:** The `Idempotency-Key` header is required for all `POST` requests to `/api/refunds`. If a request is retried with the same key, the API returns the original response rather than creating a duplicate refund. Use a UUID or other unique string.
```

**Request body**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| customer | string | Yes | The customer's unique ID |
| transaction | string | Yes | The transaction's unique ID |
| amount | number | Yes | Refund amount |
| reason | string | No | Reason for the refund |
| status | string | No | Refund status — `pending`, `processed`, or `rejected` |

**Example request**
```json
{
    "customer": "69b5330a4314418540e8676e",
    "transaction": "69b536d0bcfe7db4d09c1403",
    "amount": 15000,
    "reason": "Customer requested refund",
    "status": "pending"
}
```

**Example response**
```json
{
    "_id": "69b537548386681aea83bfd2",
    "customer": "69b5330a4314418540e8676e",
    "transaction": "69b536d0bcfe7db4d09c1403",
    "amount": 15000,
    "reason": "Customer requested refund",
    "status": "pending",
    "createdAt": "2026-03-14T10:24:20.638Z"
}
```

---

### List all refunds

Returns a list of all refunds.

**Endpoint**
```
GET /api/refunds
```

**Headers**
```
Authorization: Bearer <token>
```
**Query parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| limit | integer | No | Number of refunds to return. Defaults to 10, maximum 100. |
| offset | integer | No | Number of refunds to skip. Use for pagination. |

**Example request**
```
GET /api/refunds?limit=10&offset=0
```

**Example response**
```json
[
    {
        "_id": "69b537548386681aea83bfd2",
        "customer": {
            "_id": "69b5330a4314418540e8676e",
            "name": "John Doe",
            "email": "john@example.com"
        },
        "transaction": {
            "_id": "69b536d0bcfe7db4d09c1403",
            "amount": 15000,
            "status": "completed"
        },
        "amount": 15000,
        "reason": "Customer requested refund",
        "status": "pending",
        "createdAt": "2026-03-14T10:24:20.638Z"
    }
]
```

---

### Retrieve a refund

Returns a single refund by ID.

**Endpoint**
```
GET /api/refunds/:id
```

**Headers**
```
Authorization: Bearer <token>
```

**Path parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | The refund's unique ID |

**Example response**
```json
{
    "_id": "69b537548386681aea83bfd2",
    "customer": {
        "_id": "69b5330a4314418540e8676e",
        "name": "John Doe",
        "email": "john@example.com"
    },
    "transaction": {
        "_id": "69b536d0bcfe7db4d09c1403",
        "amount": 15000,
        "status": "completed"
    },
    "amount": 15000,
    "reason": "Customer requested refund",
    "status": "pending",
    "createdAt": "2026-03-14T10:24:20.638Z"
}
```

---

### Update a refund

Updates an existing refund's status.

**Endpoint**
```
PUT /api/refunds/:id
```

**Headers**
```
Authorization: Bearer <token>
```

**Path parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | The refund's unique ID |

**Request body**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| status | string | No | Updated status — `pending`, `processed`, or `rejected` |
| reason | string | No | Updated reason |

**Example request**
```json
{
    "status": "processed"
}
```

**Example response**
```json
{
    "_id": "69b537548386681aea83bfd2",
    "customer": "69b5330a4314418540e8676e",
    "transaction": "69b536d0bcfe7db4d09c1403",
    "amount": 15000,
    "reason": "Customer requested refund",
    "status": "processed",
    "createdAt": "2026-03-14T10:24:20.638Z"
}
```