export const ROUTES = {
  ROOT: '/',
  ADMIN: '/admin',
  LOGIN: '/login',
  LOGOUT: '/logout',
  NOT_FOUND: '*',
};

export const ADMIN_ROUTES = {
  ORDERS: {
    ROOT: 'orders',
    NEW: 'new',
    IN_WORK: 'in-work',
    READY: 'ready',
    ON_DELIVERY: 'on-delivery',
    COMPLETED: 'completed',
    CANCELED: 'canceled',
  },
  DISHES: {
    ROOT: 'dishes',
    NEW: 'new',
    LIST: 'list',
  },
  USERS: {
    ROOT: 'users',
    NEW: 'new',
    LIST: 'list',
  },
};
