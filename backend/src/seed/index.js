import mongoose from 'mongoose';
import { env } from '../config/env.js';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Collection from '../models/Collection.js';
import Product from '../models/Product.js';
import Bundle from '../models/Bundle.js';
import Store from '../models/Store.js';
import Coupon from '../models/Coupon.js';
import ContentBlock from '../models/ContentBlock.js';
import Review from '../models/Review.js';
import Order from '../models/Order.js';
import Setting from '../models/Setting.js';
import { logger } from '../config/logger.js';

async function runSeed() {
  const isFresh = process.argv.includes('--fresh');
  
  await mongoose.connect(env.MONGODB_URI);
  logger.info('Connected to MongoDB for seeding');

  if (isFresh) {
    logger.info('Dropping database...');
    await mongoose.connection.db.dropDatabase();
  }

  logger.info('Generating seed data...');
  const { generateSeedData } = await import('./seedData.js');
  await generateSeedData();

  const counts = {
    User: await User.countDocuments(),
    Category: await Category.countDocuments(),
    Collection: await Collection.countDocuments(),
    Product: await Product.countDocuments(),
    Bundle: await Bundle.countDocuments(),
    Store: await Store.countDocuments(),
    Coupon: await Coupon.countDocuments(),
    ContentBlock: await ContentBlock.countDocuments(),
    Review: await Review.countDocuments(),
    Order: await Order.countDocuments(),
    Setting: await Setting.countDocuments(),
  };

  logger.info('Database counts:', counts);

  process.exit(0);
}

runSeed().catch(err => {
  logger.error(err);
  process.exit(1);
});
