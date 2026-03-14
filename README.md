# Payrail API

A fintech payments API built with Node.js, Express, and MongoDB. Payrail enables developers to manage customers, payment methods, transactions, and refunds through a secure REST API authenticated with JSON Web Tokens (JWT).

## Base URL
```
https://payrail-api.onrender.com
```

## Authentication

Payrail uses JWT bearer tokens. Include the token in the `Authorization` header of every request.
```
Authorization: Bearer <token>
```

To get a token, register or log in via the `/api/auth` endpoints.

## Resources

| Resource | Endpoint | Description |
|----------|----------|-------------|
| Auth | `/api/auth` | Register and log in |
| Customers | `/api/customers` | Manage customer profiles |
| Payment Methods | `/api/payment-methods` | Manage cards and bank accounts |
| Transactions | `/api/transactions` | Process and track payments |
| Refunds | `/api/refunds` | Manage refund requests |

## Documentation

| Guide | Description |
|-------|-------------|
| [Quickstart](docs/quickstart.md) | Get up and running in minutes |
| [API Reference](docs/api-reference.md) | Full endpoint reference |
| [Authentication](docs/authentication.md) | How JWT authentication works |
```

## Running Locally

### Prerequisites
- Node.js v20+
- MongoDB Atlas account

### Setup

1. Clone the repository
```
git clone https://github.com/writingteacher/payrail-api.git
cd payrail-api
```

2. Install dependencies
```
npm install
```

3. Create a `.env` file in the root folder
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

4. Start the development server
```
npm run dev
```

The API will be running at `http://localhost:3000`.