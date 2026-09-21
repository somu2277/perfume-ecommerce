import Redis from 'ioredis';
import { env } from './env.js';

export const redis = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379');

redis.on('error', (err) => console.error('Redis Client Error', err));
