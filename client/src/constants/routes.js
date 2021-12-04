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
  PROFILE: ROUTES.PROFILE,
  USERS: ROUTES.USERS,
  ORDERS: ROUTES.ORDERS,
  SHOP: ROUTES.SHOP,
  CART: ROUTES.CART,
};

export const USER_ROUTES = {
  PROFILE: ROUTES.PROFILE,
  SHOP: ROUTES.SHOP,
  CART: ROUTES.CART,
  STATISTICS: ROUTES.STATISTICS,
  ORDERS: ROUTES.ORDERS,
  DIARY: 'diary',
  FRIENDS: 'friends',
  CALCULATOR: 'calculator',
  QUESTION: 'question',
};
