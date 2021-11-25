import { combineReducers } from 'redux';

import dishes from './dishes';
import organizations from './organizations';
import user from './user';

export default combineReducers({
  dishes,
  organizations,
  user,
});
