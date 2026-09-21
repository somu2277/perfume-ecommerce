# AdilQadri Perfume E-Commerce Platform

A complete, full-stack MERN (MongoDB, Express, React, Node.js) e-commerce platform built specifically for a premium perfume and attar storefront.

## 🏗 Architecture

The platform is split into three independent applications to ensure scalability, clean separation of concerns, and independent deployment cycles:

1. **`backend/`** (Node.js, Express, Mongoose)
   - Serves as the central REST API.
   - Handles data persistence, authentication (JWT + OTP), Role-Based Access Control (RBAC), and Razorpay payment integration.
   - Connects to MongoDB Atlas and Redis (for rate limiting).

2. **`frontend/`** (React 18, Vite, Tailwind CSS, Redux Toolkit)
   - The customer-facing storefront.
   - Features responsive design, complex product filtering via faceted search, a sliding cart drawer, and checkout flows.
   - Utilizes Radix UI primitives for accessible dropdowns and modals.

3. **`admin/`** (React 18, Vite, Tailwind CSS)
   - The internal ERP/Admin dashboard.
   - Used by store managers to manage inventory, products, orders, and view revenue analytics.

---

## 🚀 Quick Start Guide

You will need to run all three applications concurrently in development. Open three separate terminal windows:

### Terminal 1: Start the Backend API
```bash
cd backend
npm install
npm run dev
```
*Runs on `http://localhost:5000`*

### Terminal 2: Start the Customer Storefront
```bash
cd frontend
npm install
npm run dev
```
*Runs on `http://localhost:5173`*

### Terminal 3: Start the Admin Dashboard
```bash
cd admin
npm install
npm run dev
```
*Runs on `http://localhost:5174` (or next available port)*

---

## 🐳 Docker Deployment

The repository includes a production-ready `docker-compose.yml` that will build and orchestrate the entire stack.

```bash
docker compose up -d --build
```
This will:
- Spin up a local Redis container.
- Build and run the Node.js API.
- Build the Frontend and serve it via a high-performance Caddy web server (Port 80).
- Build the Admin dashboard and serve it via Caddy (Port 8080).

---

## 🛠 Tech Stack Details

- **Database**: MongoDB Atlas
- **Caching/Rate Limiting**: Redis
- **Backend Framework**: Express.js
- **Validation**: Zod
- **Authentication**: Argon2 hashing, JWT (JSON Web Tokens)
- **Payment Gateway**: Razorpay
- **Frontend Framework**: React 18 (via Vite)
- **State Management**: Redux Toolkit (RTK)
- **Styling**: Tailwind CSS v3
- **UI Components**: Radix UI (Headless UI for accessibility)
- **Routing**: React Router v6
