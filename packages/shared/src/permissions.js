export const PERMISSIONS = {
  superadmin: ['*'],
  admin: ['*', '!staff:delete', '!settings:integrations:write'],
  catalogue: [
    'product:read','product:write','product:delete','variant:*','category:*','collection:*',
    'bundle:*','media:*','inventory:read','inventory:write','review:read','review:moderate'
  ],
  ops: [
    'order:read','order:update','order:cancel','shipment:*','return:*','inventory:*',
    'store:*','customer:read','product:read'
  ],
  marketing: [
    'coupon:*','banner:*','content:*','newsletter:*','loyalty:rules:write',
    'product:read','product:seo:write','collection:read','collection:write','report:read'
  ],
  support: [
    'order:read','order:note:write','customer:read','return:read','return:request',
    'inquiry:*','review:read','product:read'
  ],
  customer: ['self:*']
};
