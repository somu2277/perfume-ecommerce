import { Router } from 'express';
import * as catalogueController from '../../controllers/catalogue.controller.js';

const router = Router();

router.get('/config', catalogueController.getConfig);
router.get('/categories', catalogueController.getCategories);
router.get('/categories/:slug', catalogueController.getCategoryBySlug);
router.get('/collections', catalogueController.getCollections);
router.get('/collections/:slug', catalogueController.getCollectionBySlug);
router.get('/products', catalogueController.getProducts);
router.get('/products/:slug', catalogueController.getProductBySlug);
router.get('/products/:slug/reviews', catalogueController.getProductReviews);
router.get('/search/suggest', catalogueController.searchSuggest);
router.get('/bundles', catalogueController.getBundles);
router.get('/bundles/:slug', catalogueController.getBundleBySlug);
router.get('/banners', catalogueController.getBanners);
router.get('/content/:key', catalogueController.getContentBlock);
router.get('/stores', catalogueController.getStores);
router.get('/stores/near', catalogueController.getStoresNear);
router.get('/stores/:slug', catalogueController.getStoreBySlug);

export default router;
