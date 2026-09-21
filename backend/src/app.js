import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import mongoSanitize from 'express-mongo-sanitize';
import pinoHttp from 'pino-http';
import { env } from './config/env.js';
import { logger } from './config/logger.js';
import { errorHandler, notFound } from './middleware/error.js';
import publicAuthRoutes from './routes/public/auth.js';
import adminAuthRoutes from './routes/admin/auth.js';
import meRoutes from './routes/customer/me.js';
import catalogueRoutes from './routes/public/catalogue.js';
import cartRoutes from './routes/customer/cart.js';
import orderRoutes from './routes/customer/order.js';
import addressRoutes from './routes/customer/address.js';
import wishlistRoutes from './routes/customer/wishlist.js';
import razorpayRoutes from './routes/webhooks/razorpay.js';
import adminDashboardRoutes from './routes/admin/dashboard.js';
import adminProductRoutes from './routes/admin/products.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: [env.WEB_BASE_URL, env.ADMIN_BASE_URL], credentials: true }));
app.use(express.json({ limit: '100kb' }));
app.use(mongoSanitize());
app.use(hpp());
app.use(pinoHttp({ logger }));

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

app.use('/api', catalogueRoutes);
app.use('/api/auth', publicAuthRoutes);
app.use('/api/me', meRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/webhooks/razorpay', razorpayRoutes);
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin/dashboard', adminDashboardRoutes);
app.use('/api/admin/products', adminProductRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
