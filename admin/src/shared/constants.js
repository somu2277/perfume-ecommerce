export const ORDER_STATUS = ['pending','confirmed','processing','packed','shipped','out_for_delivery','delivered','cancelled','returned','refunded'];
export const PAYMENT_STATUS = ['pending','authorized','paid','failed','refunded','partially_refunded'];
export const PAYMENT_METHODS = ['upi','card','netbanking','wallet','cod'];
export const PRODUCT_BADGES = ['none','best-seller','trending','new-arrival','limited','sale'];
export const BADGE_LABELS = { 'best-seller':'Best Seller', trending:'Trending', 'new-arrival':'New Arrival', limited:'Limited Edition', sale:'Sale' };
export const FRAGRANCE_FAMILIES = ['floral','woody','oriental','fresh','citrus','musky','sweet','spicy','aquatic','fruity','gourmand','leather','amber'];
export const GENDERS = ['men','women','unisex'];
export const SORT_OPTIONS = [
  { value:'featured', label:'Featured' }, { value:'relevance', label:'Most relevant' },
  { value:'best-selling', label:'Best selling' }, { value:'title-asc', label:'Alphabetically, A-Z' },
  { value:'title-desc', label:'Alphabetically, Z-A' }, { value:'price-asc', label:'Price, low to high' },
  { value:'price-desc', label:'Price, high to low' }, { value:'created-asc', label:'Date, old to new' },
  { value:'created-desc', label:'Date, new to old' }
];
export const ROLES = ['customer','support','catalogue','ops','marketing','admin','superadmin'];
