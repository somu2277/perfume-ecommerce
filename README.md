# AdilQadri Perfume E-Commerce

This repository contains the complete MERN stack architecture for the AdilQadri Perfume E-Commerce platform, split into three independent directories:

- `backend/`: Node.js, Express, Mongoose API
- `frontend/`: React, Vite, Tailwind CSS Customer Storefront
- `admin/`: React, Vite, Tailwind CSS Admin Dashboard

## Running Locally (Development)

### 1. Start Infrastructure (Optional if using MongoDB Atlas)
If you want to use a local Redis instance (highly recommended for rate-limiting):
```bash
docker compose up -d redis
```
*(Note: Your backend `.env` is currently configured to connect to your remote MongoDB Atlas cluster).*

### 2. Start the Backend
Open a new terminal and run:
```bash
cd backend
npm install
npm run dev
```
The API will run on `http://localhost:5000`.

### 3. Start the Frontend (Customer Storefront)
Open a new terminal and run:
```bash
cd frontend
npm install
npm run dev
```
The Storefront will run on `http://localhost:5173`.

### 4. Start the Admin Dashboard
Open a new terminal and run:
```bash
cd admin
npm install
npm run dev
```
The Admin panel will run on the next available port (e.g. `http://localhost:5174`).

---

## Production Deployment
To deploy the entire stack using Docker Compose:
```bash
docker compose up -d --build
```
This will build and deploy the API container, and serve the Frontend and Admin built static files using Caddy.
