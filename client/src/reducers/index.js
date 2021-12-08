import { combineReducers } from 'redux';

import dishes from './dishes';
import organizationReducer from './organizations';
import userReducer from './user';
import roles from './roles';
import counterReducer from './counter';
import cartReducer from './cart';
import orderReducer from './order';
import consumptions from './consumption';

export default combineReducers({
  dishes,
  roles,
  user: userReducer.user,
  users: userReducer.users,
  organization: organizationReducer.organization,
  organizations: organizationReducer.organizations,
  counter: counterReducer,
  cart: cartReducer,
  orders: orderReducer.orders,
  activeOrders: orderReducer.activeOrders,
  consumptions,
});
