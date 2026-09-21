# Backend API - AdilQadri E-Commerce

The backend is built with Node.js, Express.js, and Mongoose. It acts as the central data layer and business logic controller for both the customer frontend and the admin dashboard.

## Features
- **Authentication**: JWT-based auth with Refresh tokens. OTP simulation for customers. `argon2` password hashing for admins.
- **RBAC Middleware**: Granular Role-Based Access Control mapping endpoints to specific permissions (e.g. `product:write`, `order:read`).
- **Faceted Search Engine**: A powerful MongoDB Aggregation Pipeline (`$facet`) powers the public catalogue, returning products, dynamic filter counts, and min/max prices in a single query.
- **Razorpay Integration**: Server-side generation of Razorpay Order IDs and secure Webhook signature validation (`crypto.createHmac`).
- **Security**: Hardened with `helmet`, `cors`, `hpp` (HTTP Parameter Pollution), and `express-mongo-sanitize`.
- **Rate Limiting**: Distributed rate limiting using Redis.
- **Validation**: Strict schema validation on all incoming requests using `Zod`.

## Environment Setup
Create an `.env` file based on `.env.example`:

```env
MONGODB_URI=mongodb://...
PORT=5000
NODE_ENV=development
JWT_ACCESS_SECRET=your_jwt_access_secret_key_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret_here
```

## Seeding the Database
To populate the database with realistic products, categories, reviews, and test users:
```bash
node src/seed/index.js --fresh
```

## Running the API
```bash
npm install
npm run dev
```
The server will start on port 5000 by default.
