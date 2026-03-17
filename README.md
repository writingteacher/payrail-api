# Payrail API

A fintech payments REST API built with Node.js, Express, and MongoDB. Payrail enables developers to manage customers, payment methods, transactions, and refunds through a secure, JWT-authenticated API.

**Live API:** https://payrail-api.onrender.com

**Documentation:** https://writingteacher.github.io/payrail-docs/

---

## About This Project

Payrail is a portfolio project designed and built by [Rob Whyte](https://github.com/writingteacher) to demonstrate end-to-end API design, development, and documentation skills.

**My role:**
- Designed the API architecture and resource structure
- Built the API in Node.js, Express, and MongoDB
- Implemented production-grade features including JWT authentication, pagination, idempotency key enforcement, rate limiting, soft deletes, and input validation
- Wrote the full documentation suite — quickstart, API reference, tutorials, code examples, and error reference — modelled on Stripe and PayPal standards
- Deployed the API on Render and the documentation site on GitHub Pages using Docusaurus

The goal was not just to build an API, but to document it the way a senior technical writer would in a real fintech company.


## Overview

Payrail is a portfolio project built to demonstrate fintech API design and documentation. It follows industry best practices including:

- JWT bearer token authentication
- Amounts stored in minor units (cents) to avoid floating point errors
- Idempotency keys to prevent duplicate charges
- ISO 4217 currency codes
- Structured error responses with error types and codes
- Asynchronous transaction processing with status lifecycle management


## Base URL
```
https://payrail-api.onrender.com
```

---

## Quick Example

Register and make your first API call in under a minute:
```bash
curl -X POST https://payrail-api.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

---

## Resources

| Resource | Endpoint | Description |
|----------|----------|-------------|
| Auth | `/api/auth` | Register and log in |
| Customers | `/api/customers` | Manage customer profiles |
| Payment Methods | `/api/payment-methods` | Manage cards and bank accounts |
| Transactions | `/api/transactions` | Process and track payments |
| Refunds | `/api/refunds` | Manage refund requests |

---

## Documentation

| Guide | Description |
|-------|-------------|
| [Quickstart](docs/quickstart.md) | Get up and running in minutes |
| [Authentication](docs/authentication.md) | How JWT authentication works |
| [Payment Workflow](docs/payment-workflow.md) | End-to-end payment flow and architecture |
| [Webhooks](docs/webhooks.md) | Real-time event notifications |
| [Data Models](docs/data-models.md) | Object definitions for all resources |
| [Code Examples](docs/code-examples.md) | curl, JavaScript, and Python examples |
| [Versioning](docs/versioning.md) | Version policy and changelog |
| [API Reference](docs/api-reference.md) | Full endpoint reference |
| [Postman Collection](postman/payrail-api.postman_collection.json) | Import into Postman to test all endpoints |
| [Tutorial: Process Your First Payment](docs/tutorials/process-first-payment.md) | End-to-end payment walkthrough |
| [Tutorial: Handle a Failed Transaction](docs/tutorials/handle-failed-transaction.md) | Detect, understand, and retry failed payments |
| [Postman Collection](https://www.postman.com/techcomteacher99-7835706/workspace/payrail-api/collection/53069530-700ccabf-377e-47c2-9513-f36683e4777f?action=share&source=copy-link&creator=53069530) | Open directly in Postman Web |
| [Postman Environment](postman/payrail-api.postman_environment.json) | Import into Postman for pre-configured variables |
| [FAQ](docs/faq.md) | Frequently asked questions |
| [OpenAPI Spec](openapi.yaml) | Machine-readable API specification — [view interactive docs](https://editor.swagger.io/?url=https://raw.githubusercontent.com/writingteacher/payrail-api/master/openapi.yaml) |

---

## Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js |
| Framework | Express |
| Database | MongoDB Atlas |
| Authentication | JSON Web Tokens (JWT) |
| Deployment | Render |

---

## Running Locally

### Prerequisites
- Node.js v20+
- MongoDB Atlas account

### Setup

**1. Clone the repository**
```bash
git clone https://github.com/writingteacher/payrail-api.git
cd payrail-api
```

**2. Install dependencies**
```bash
npm install
```

**3. Create a `.env` file in the root folder**
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

**4. Start the development server**
```bash
npm run dev
```

The API will be running at `http://localhost:3000`.

---

## Project Structure
```
payrail-api/
├── src/
│   ├── config/         # Database connection
│   ├── controllers/    # Route handlers
│   ├── middleware/     # Auth and error handling
│   ├── models/         # Mongoose schemas
│   └── routes/         # API routes
├── docs/               # Documentation
├── postman/            # Postman collection
└── server.js           # Entry point
```

---

## License

MIT