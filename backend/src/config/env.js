import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('5000'),
  API_BASE_URL: z.string().url().default('http://localhost:5000'),
  WEB_BASE_URL: z.string().url().default('http://localhost:5173'),
  ADMIN_BASE_URL: z.string().url().default('http://localhost:5174'),
  MONGODB_URI: z.string().url().default('mongodb://127.0.0.1:27017/perfume_commerce'),
  // Add other variables here as needed in subsequent phases
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment variables:\n', _env.error.format());
  process.exit(1);
}

export const env = _env.data;
