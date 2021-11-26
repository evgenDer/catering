import { combineReducers } from 'redux';

import dishes from './dishes';
import organizations from './organizations';
import user from './user';
import roles from './roles';

export default combineReducers({
  dishes,
  organizations,
  user,
  roles,
});
