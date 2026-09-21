import Setting from '../models/Setting.js';
import Category from '../models/Category.js';
import Collection from '../models/Collection.js';
import Product from '../models/Product.js';
import Review from '../models/Review.js';
import Bundle from '../models/Bundle.js';
import Banner from '../models/Banner.js';
import ContentBlock from '../models/ContentBlock.js';
import Store from '../models/Store.js';
import { getFilteredProducts } from '../services/catalogue.service.js';

export const getConfig = async (req, res, next) => {
  try {
    const setting = await Setting.findOne({ key: 'global' }).populate('contactDock.defaultStore');
    res.json({ success: true, data: setting || {} });
  } catch (err) { next(err); }
};

export const getCategories = async (req, res, next) => {
  try {
    const query = { isActive: true, isDeleted: false };
    if (req.query.showInMenu) query.showInMenu = true;
    
    const categories = await Category.find(query).sort({ position: 1 });
    res.json({ success: true, data: categories });
  } catch (err) { next(err); }
};

export const getCategoryBySlug = async (req, res, next) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug, isActive: true, isDeleted: false });
    if (!category) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Category not found' } });
    
    const children = await Category.find({ parent: category._id, isActive: true, isDeleted: false }).sort({ position: 1 });
    res.json({ success: true, data: { ...category.toObject(), children } });
  } catch (err) { next(err); }
};

export const getCollections = async (req, res, next) => {
  try {
    const collections = await Collection.find({ isActive: true, isDeleted: false }).sort({ position: 1 });
    res.json({ success: true, data: collections });
  } catch (err) { next(err); }
};

export const getCollectionBySlug = async (req, res, next) => {
  try {
    const collection = await Collection.findOne({ slug: req.params.slug, isActive: true, isDeleted: false });
    if (!collection) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Collection not found' } });
    res.json({ success: true, data: collection });
  } catch (err) { next(err); }
};

export const getProducts = async (req, res, next) => {
  try {
    const data = await getFilteredProducts(req.query);
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

export const getProductBySlug = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug, isDeleted: false })
      .populate('primaryCategory')
      .populate('relatedProducts')
      .populate('frequentlyBoughtWith');
      
    if (!product || (product.status !== 'active' && !req.query.preview)) {
       return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Product not found' } });
    }
    res.json({ success: true, data: product });
  } catch (err) { next(err); }
};

export const getProductReviews = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Product not found' } });
    
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    
    const reviews = await Review.find({ product: product._id, status: 'approved' })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
      
    const total = await Review.countDocuments({ product: product._id, status: 'approved' });
    
    res.json({ 
      success: true, 
      data: reviews, 
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) } 
    });
  } catch (err) { next(err); }
};

export const searchSuggest = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q || q.length < 2) return res.json({ success: true, data: { products: [], categories: [], collections: [] } });
    
    const products = await Product.find({ $text: { $search: q }, status: 'active', isDeleted: false })
      .select('title slug image price')
      .limit(5);
      
    const categories = await Category.find({ name: new RegExp(q, 'i'), isActive: true, isDeleted: false })
      .select('name slug')
      .limit(5);
      
    const collections = await Collection.find({ title: new RegExp(q, 'i'), isActive: true, isDeleted: false })
      .select('title slug')
      .limit(5);
      
    res.json({ success: true, data: { products, categories, collections } });
  } catch (err) { next(err); }
};

export const getBundles = async (req, res, next) => {
  try {
    const bundles = await Bundle.find({ isActive: true }).sort({ position: 1 });
    res.json({ success: true, data: bundles });
  } catch (err) { next(err); }
};

export const getBundleBySlug = async (req, res, next) => {
  try {
    const bundle = await Bundle.findOne({ slug: req.params.slug, isActive: true })
      .populate('eligibility.categories')
      .populate('eligibility.products');
    if (!bundle) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Bundle not found' } });
    res.json({ success: true, data: bundle });
  } catch (err) { next(err); }
};

export const getBanners = async (req, res, next) => {
  try {
    const { placement } = req.query;
    const query = { isActive: true };
    if (placement) query.placement = placement;
    
    const banners = await Banner.find(query).sort({ position: 1 });
    res.json({ success: true, data: banners });
  } catch (err) { next(err); }
};

export const getContentBlock = async (req, res, next) => {
  try {
    const content = await ContentBlock.findOne({ key: req.params.key, isActive: true });
    if (!content) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Content not found' } });
    res.json({ success: true, data: content });
  } catch (err) { next(err); }
};

export const getStores = async (req, res, next) => {
  try {
    const stores = await Store.find({ isActive: true }).sort({ position: 1 });
    res.json({ success: true, data: stores });
  } catch (err) { next(err); }
};

export const getStoresNear = async (req, res, next) => {
  try {
    const { lat, lng, radiusKm = 25 } = req.query;
    
    if (!lat || !lng) return res.status(400).json({ success: false, error: { message: 'lat and lng required' } });
    
    const stores = await Store.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [Number(lng), Number(lat)] },
          distanceField: 'distanceMeters',
          maxDistance: Number(radiusKm) * 1000,
          spherical: true,
          query: { isActive: true }
        }
      },
      { $limit: 20 },
      { $addFields: { distanceKm: { $round: [{ $divide: ['$distanceMeters', 1000] }, 1] } } }
    ]);
    
    res.json({ success: true, data: stores });
  } catch (err) { next(err); }
};

export const getStoreBySlug = async (req, res, next) => {
  try {
    const store = await Store.findOne({ slug: req.params.slug, isActive: true });
    if (!store) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Store not found' } });
    res.json({ success: true, data: store });
  } catch (err) { next(err); }
};
