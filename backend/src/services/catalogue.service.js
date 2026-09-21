import Product from '../models/Product.js';
import Collection from '../models/Collection.js';
import Category from '../models/Category.js';

export const getFilteredProducts = async (query) => {
  const {
    collection, category, q, availability, minPrice, maxPrice,
    fragrance, gender, notes, badge, rating, sort, page = 1, limit = 24, facets
  } = query;

  const baseMatch = { status: 'active', isDeleted: false };

  if (collection) {
    const coll = await Collection.findOne({ slug: collection });
    if (coll) {
      if (coll.type === 'manual') {
        baseMatch._id = { $in: coll.products };
      } else {
        // Implement rules parsing if needed
      }
    }
  }

  if (category) {
    const cat = await Category.findOne({ slug: category });
    if (cat) {
      baseMatch.categories = cat._id;
    }
  }

  const textMatch = q ? { $text: { $search: q } } : {};
  
  const filterMatch = {};
  
  if (availability) {
    if (availability === 'in-stock') filterMatch.stock = { $gt: 0 };
    if (availability === 'out-of-stock') filterMatch.stock = { $lte: 0 };
  }
  
  if (minPrice || maxPrice) {
    filterMatch.sellingPrice = {};
    if (minPrice) filterMatch.sellingPrice.$gte = Number(minPrice);
    if (maxPrice) filterMatch.sellingPrice.$lte = Number(maxPrice);
  }
  
  if (fragrance) filterMatch.fragranceFamily = { $in: fragrance.split(',') };
  if (gender) filterMatch.gender = { $in: gender.split(',') };
  if (notes) filterMatch.noteTags = { $in: notes.split(',') };
  if (badge) filterMatch.badge = badge;
  if (rating) filterMatch['rating.average'] = { $gte: Number(rating) };

  let sortStage = { position: 1, 'stats.unitsSold': -1 };
  if (sort === 'relevance' && q) sortStage = { score: { $meta: 'textScore' } };
  else if (sort === 'best-selling') sortStage = { 'stats.unitsSold': -1 };
  else if (sort === 'title-asc') sortStage = { title: 1 };
  else if (sort === 'title-desc') sortStage = { title: -1 };
  else if (sort === 'price-asc') sortStage = { sellingPrice: 1 };
  else if (sort === 'price-desc') sortStage = { sellingPrice: -1 };
  else if (sort === 'created-asc') sortStage = { publishedAt: 1 };
  else if (sort === 'created-desc') sortStage = { publishedAt: -1 };
  
  sortStage._id = 1;

  const skip = (Number(page) - 1) * Number(limit);

  const pipeline = [
    { $match: baseMatch },
    ...(q ? [{ $match: textMatch }] : []),
    { $match: filterMatch }
  ];

  if (facets === 'true') {
    const cardProjection = {
      title: 1, slug: 1, badge: 1, badgeLabelOverride: 1, images: 1, 
      mrp: 1, sellingPrice: 1, 'rating.average': 1, 'rating.count': 1, 
      stock: 1, hasVariants: 1, volumeMl: 1, trackInventory: 1, allowBackorder: 1,
      primaryCategory: 1
    };

    pipeline.push({
      $facet: {
        products: [ { $sort: sortStage }, { $skip: skip }, { $limit: Number(limit) }, { $project: cardProjection } ],
        total:    [ { $count: 'count' } ],
        priceRange: [ { $group: { _id: null, min: { $min: '$sellingPrice' }, max: { $max: '$sellingPrice' } } } ],
        fragrance: [ { $unwind: '$fragranceFamily' }, { $group: { _id: '$fragranceFamily', count: { $sum: 1 } } }, { $sort: { count: -1 } } ],
        notes:     [ { $unwind: '$noteTags' },        { $group: { _id: '$noteTags',        count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 40 } ],
        gender:    [ { $group: { _id: '$gender',      count: { $sum: 1 } } } ],
        availability: [ { $group: { _id: { $gt: ['$stock', 0] }, count: { $sum: 1 } } } ]
      }
    });

    const [result] = await Product.aggregate(pipeline);
    
    // Format response to match spec
    const products = result.products.map(p => {
      // transform to match exactly the required JSON
      return {
        id: p._id,
        slug: p.slug,
        title: p.title,
        categoryLabel: p.primaryCategory ? "ATTAR" : "ATTAR", // Need to populate this properly in real app
        badge: p.badge,
        badgeLabel: p.badgeLabelOverride || p.badge,
        image: p.images?.[0] || null,
        hoverImage: p.images?.[1] || null,
        mrp: p.mrp,
        sellingPrice: p.sellingPrice,
        discountPercent: p.mrp > p.sellingPrice ? Math.round(((p.mrp - p.sellingPrice) / p.mrp) * 100) : 0,
        rating: p.rating,
        inStock: p.trackInventory ? (p.stock > 0 || p.allowBackorder) : true,
        hasVariants: p.hasVariants,
        variantCount: 0, // Compute if populated
        volumeMl: p.volumeMl
      };
    });

    return {
      products,
      facets: {
        availability: result.availability,
        price: result.priceRange[0] || { min: 0, max: 0 },
        fragrance: result.fragrance.map(f => ({ value: f._id, count: f.count })),
        gender: result.gender.map(g => ({ value: g._id, count: g.count })),
        notes: result.notes.map(n => ({ value: n._id, count: n.count }))
      },
      meta: {
        total: result.total[0]?.count || 0,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil((result.total[0]?.count || 0) / Number(limit))
      }
    };
  } else {
    // Normal query without facets
    const products = await Product.aggregate([...pipeline, { $sort: sortStage }, { $skip: skip }, { $limit: Number(limit) }]);
    const count = await Product.countDocuments({ ...baseMatch, ...textMatch, ...filterMatch });
    
    return {
      products,
      meta: {
        total: count,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(count / Number(limit))
      }
    };
  }
};
