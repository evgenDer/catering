import { combineReducers } from 'redux';

import dishes from './dishes';
import organizations from './organizations';
import userReducer from './user';
import roles from './roles';

export default combineReducers({
  dishes,
  organizations,
  roles,
  user: userReducer.user,
  users: userReducer.users,
});
