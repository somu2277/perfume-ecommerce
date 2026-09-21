import mongoose from 'mongoose';
import argon2 from 'argon2';
import crypto from 'crypto';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Collection from '../models/Collection.js';
import Product from '../models/Product.js';
import Variant from '../models/Variant.js';
import Bundle from '../models/Bundle.js';
import Store from '../models/Store.js';
import Coupon from '../models/Coupon.js';
import ContentBlock from '../models/ContentBlock.js';
import Review from '../models/Review.js';
import Order from '../models/Order.js';
import Setting from '../models/Setting.js';

export const generateSeedData = async () => {
  // Clear all
  await Promise.all([
    User.deleteMany({}), Category.deleteMany({}), Collection.deleteMany({}),
    Product.deleteMany({}), Variant.deleteMany({}), Bundle.deleteMany({}),
    Store.deleteMany({}), Coupon.deleteMany({}), ContentBlock.deleteMany({}),
    Review.deleteMany({}), Order.deleteMany({}), Setting.deleteMany({})
  ]);

  // Settings
  await Setting.create({
    key: 'global',
    store: { name: 'AdilQadri', legalName: 'AdilQadri E-Commerce', gstin: '27AABCA1234A1Z5', supportPhone: '18001234567', supportEmail: 'care@adilqadri.com' },
    announcement: { text: 'Extra Discount On UPI', isActive: true, backgroundColor: '#A8863F', textColor: '#FFFFFF', linkUrl: '/' },
    loyalty: { isEnabled: true, earnRatePercent: 2, pointValueInRupees: 1, maxRedeemPercent: 20, minBalanceToRedeem: 100, signupBonus: 50 },
    shipping: { freeShippingThreshold: 499, flatRate: 49, codFee: 49, codEnabled: true, dispatchTimeText: 'Dispatches in 24 hours' },
    payment: { upiExtraDiscountEnabled: true, upiExtraDiscountType: 'percentage', upiExtraDiscountValue: 5 }
  });

  // Users
  const passwordHash = await argon2.hash('Admin@12345');
  const admins = await User.insertMany([
    { name: 'Super Admin', email: 'superadmin@store.test', phone: '9000000001', role: 'superadmin', passwordHash, isEmailVerified: true, isPhoneVerified: true },
    { name: 'Catalogue Mgr', email: 'catalogue@store.test', phone: '9000000002', role: 'catalogue', passwordHash, isEmailVerified: true, isPhoneVerified: true },
    { name: 'Ops Mgr', email: 'ops@store.test', phone: '9000000003', role: 'ops', passwordHash, isEmailVerified: true, isPhoneVerified: true },
    { name: 'Support', email: 'support@store.test', phone: '9000000004', role: 'support', passwordHash, isEmailVerified: true, isPhoneVerified: true }
  ]);

  const customers = [];
  for (let i = 1; i <= 20; i++) {
    customers.push({
      name: `Customer ${i}`, email: `customer${i}@test.com`, phone: `98000000${i.toString().padStart(2, '0')}`,
      role: 'customer', isPhoneVerified: true, referralCode: crypto.randomBytes(4).toString('hex').toUpperCase()
    });
  }
  const insertedCustomers = await User.insertMany(customers);

  // Categories
  const cats = ['Attars', 'Luxury Attars', 'Bakhoor Chips', 'Non-Alcoholic Perfumes', 'Perfume Sprays', 'Incense Sticks', 'Gifting', 'Body Sprays'];
  const insertedCategories = await Category.insertMany(cats.map((c, i) => ({
    name: c, slug: c.toLowerCase().replace(/ /g, '-'), position: i
  })));

  // Collections
  const colls = ['Premium Attars (Roll-on Perfumes)', 'Best Sellers', 'Trending Now', 'New Arrivals', 'Gifts under ₹999', 'All Products'];
  const insertedCollections = await Collection.insertMany(colls.map((c, i) => ({
    title: c, slug: c.toLowerCase().replace(/[^\w-]/g, '-').replace(/-+/g, '-'), type: 'manual', position: i
  })));

  // Products
  const products = [];
  for (let i = 1; i <= 40; i++) {
    const isAttar = i % 2 === 0;
    const catId = insertedCategories[i % 8]._id;
    const price = 499 + Math.floor(Math.random() * 1000);
    products.push({
      title: `Product ${i} - ${isAttar ? 'Attar' : 'Perfume'}`,
      slug: `product-${i}`, sku: `SKU${i}`,
      productType: isAttar ? 'attar' : 'perfume-spray',
      mrp: price + 200, sellingPrice: price, stock: 100, trackInventory: true,
      fragranceFamily: ['woody', 'floral', 'oriental'][i % 3],
      primaryCategory: catId, categories: [catId],
      status: 'active',
      badge: ['none', 'best-seller', 'trending', 'new-arrival'][i % 4],
      stats: { unitsSold: Math.floor(Math.random() * 500) }
    });
  }
  const insertedProducts = await Product.insertMany(products);

  // Bundles
  await Bundle.insertMany([
    { title: 'Get 3 Attars at ₹899', slug: '3-attars-899', itemCount: 3, bundlePrice: 899, eligibility: { mode: 'group', bundleGroup: 'attars' } },
    { title: 'Get 3 Perfumes at ₹899', slug: '3-perfumes-899', itemCount: 3, bundlePrice: 899, eligibility: { mode: 'group', bundleGroup: 'perfumes' } }
  ]);

  // Stores
  await Store.insertMany([
    {
      name: 'Kurnool Hub', slug: 'kurnool', city: 'Kurnool', state: 'Andhra Pradesh', pincode: '518001',
      addressLine1: 'Main Market', location: { type: 'Point', coordinates: [78.03, 15.82] }, type: 'flagship',
      isActive: true, managerName: 'Admin'
    },
    {
      name: 'Mumbai Store', slug: 'mumbai', city: 'Mumbai', state: 'Maharashtra', pincode: '400001',
      addressLine1: 'Colaba', location: { type: 'Point', coordinates: [72.82, 18.90] }, type: 'franchise', isActive: true
    },
    {
      name: 'Delhi Store', slug: 'delhi', city: 'Delhi', state: 'Delhi', pincode: '110001',
      addressLine1: 'CP', location: { type: 'Point', coordinates: [77.21, 28.63] }, type: 'franchise', isActive: true
    }
  ]);

  // Coupons
  await Coupon.insertMany([
    { code: 'FIRST10', type: 'percentage', value: 10, maxDiscountAmount: 150, firstOrderOnly: true },
    { code: 'UPI5', type: 'percentage', value: 5, maxDiscountAmount: 100, paymentMethods: ['upi'] },
    { code: 'FLAT100', type: 'fixed', value: 100, minOrderValue: 999 },
    { code: 'FREESHIP', type: 'free-shipping', minOrderValue: 500 },
    { code: 'WINTER20', type: 'percentage', value: 20, maxDiscountAmount: 300 }
  ]);

  // Content Blocks
  await ContentBlock.insertMany([
    { key: 'scam-alert', type: 'rich-text', title: 'Scam Alert', content: { en: 'Beware of fake websites.', hi: 'Nakli website se bache.' } },
    { key: 'shark-tank', type: 'card', title: 'As Seen on Shark Tank India', content: { en: 'We pitched on Shark Tank India!' } },
    { key: 'privacy', type: 'page', title: 'Privacy Policy', content: { en: 'Your privacy matters.' } },
    { key: 'terms', type: 'page', title: 'Terms of Service', content: { en: 'By using this site...' } },
    { key: 'refunds', type: 'page', title: 'Refunds & Returns', content: { en: 'Return within 7 days.' } },
    { key: 'shipping', type: 'page', title: 'Shipping Policy', content: { en: 'Ships in 24 hours.' } },
    { key: 'about', type: 'page', title: 'About Us', content: { en: 'Founded with a passion for fragrances.' } },
    { key: 'faq', type: 'faq-list', title: 'FAQ', content: { en: 'Q: How long does it last?\nA: 24+ hours.' } }
  ]);

  // Reviews
  const reviews = [];
  for (let i = 0; i < 300; i++) {
    const rProduct = insertedProducts[Math.floor(Math.random() * insertedProducts.length)];
    reviews.push({
      product: rProduct._id,
      user: insertedCustomers[i % 20]._id,
      authorName: insertedCustomers[i % 20].name,
      rating: [3, 4, 5, 5, 5][Math.floor(Math.random() * 5)], // mostly good
      comment: 'Great product, definitely recommend!',
      status: 'approved'
    });
  }
  await Review.insertMany(reviews);

  // Orders
  const orders = [];
  for (let i = 1; i <= 60; i++) {
    const oUser = insertedCustomers[i % 20];
    const oProduct = insertedProducts[i % 40];
    orders.push({
      orderNumber: `AQ${10000 + i}`, user: oUser._id,
      contact: { name: oUser.name, email: oUser.email, phone: oUser.phone, countryCode: '+91' },
      items: [{ product: oProduct._id, title: oProduct.title, sku: oProduct.sku, quantity: 1, unitPrice: oProduct.sellingPrice, lineTotal: oProduct.sellingPrice }],
      pricing: { subtotal: oProduct.sellingPrice, shippingCharge: 0, grandTotal: oProduct.sellingPrice },
      payment: { method: 'upi', status: 'paid', paidAt: new Date() },
      status: 'delivered'
    });
  }
  await Order.insertMany(orders);
};
