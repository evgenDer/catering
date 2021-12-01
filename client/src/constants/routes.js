export const ROUTES = {
  ROOT: '/',
  LOGIN: '/login',
  LOGOUT: '/logout',
  REGISTER: '/register',
  NOT_FOUND: '*',
  SHOP: 'shop',
  CART: 'shop/cart',
  ORDERS: 'orders',
  USERS: 'users',
  PROFILE: 'profile',
  STATISTICS: 'statistics',
};

export const ADMIN_ROUTES = {
  ORDERS: 'orders',
  ORGANIZATIONS: 'organizations',
  DISHES: 'dishes',
  USERS: ROUTES.USERS,
};

export const HEAD_ORGANIZATION_ROUTES = {
  ORGANIZATION: 'organization',
  PAYMENTS: 'payments',
  STATISTICS: ROUTES.STATISTICS,
  PROFILE: ROUTES.PROFILE,
  USERS: ROUTES.USERS,
  ORDERS: ROUTES.ORDERS,
  SHOP: ROUTES.SHOP,
  CART: ROUTES.CART,
};
