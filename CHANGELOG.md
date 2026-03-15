# Changelog

All notable changes to the Payrail API are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/). Payrail uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] — 2026-03-14

### Added
- Customer management — create, read, update, and delete customers
- Payment method management — add and manage cards and bank accounts
- Transaction processing — create and track payments
- Refund management — request and track refunds
- JWT authentication — register and log in to receive bearer tokens
- Idempotency key support on all POST requests
- ISO 4217 currency code support
- Amounts stored in minor units (cents) to prevent floating point errors
- Structured error responses with error types and codes
- Transaction status lifecycle — pending, completed, failed, refunded
- Full API reference documentation
- Quickstart guide
- Authentication guide
- Payment workflow guide
- Webhooks documentation
- Data models documentation
- Code examples in curl, JavaScript, and Python
- Versioning policy
- Postman collection with all 19 endpoints
- Tutorials — process first payment, handle failed transaction

---

## Upcoming

### Planned for v1.1.0
- Pagination implementation on list endpoints
- Idempotency key enforcement in code
- Amounts in cents enforced at the model level
- Rate limiting implementation
- Webhook delivery system
- SDK examples