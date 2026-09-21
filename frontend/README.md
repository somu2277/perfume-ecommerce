# Customer Storefront - AdilQadri E-Commerce

The frontend is a blazing fast React application built with Vite, Tailwind CSS, and Redux Toolkit. It serves as the primary touchpoint for customers shopping for premium attars and perfumes.

## Features
- **Redux Toolkit**: Global state management for Authentication (`authSlice`) and Shopping Cart (`cartSlice`).
- **Tailwind CSS**: Utility-first styling utilizing a custom design token system configured in `tailwind.config.js` to match the brand's exact color palette (Maroon, Gold, Cream).
- **Radix UI**: Headless accessible components used for complex UI elements like the Cart Drawer (`Dialog`), Login Modal, and Sorting Selectors (`DropdownMenu`).
- **Axios Interceptors**: Automatically injects JWT Bearer tokens into API requests and globally handles 401 Unauthorized responses.
- **Responsive Layout**: Fully optimized for mobile and desktop screens.

## Directory Structure
- `src/components/`: Reusable UI components (Layout, Auth, Cart).
- `src/pages/`: Route-level components (Home, Collection, Product).
- `src/store/`: Redux configuration and state slices.
- `src/utils/`: Helper functions and API instances.
- `src/styles/`: Global CSS and design tokens.

## Running Locally
Ensure the Backend API is running on Port 5000 first, then:

```bash
npm install
npm run dev
```
The application will be available at `http://localhost:5173`.
