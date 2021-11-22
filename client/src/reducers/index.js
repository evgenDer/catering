import { combineReducers } from 'redux';

import dishes from './dishes';
import organizations from './organizations';

export default combineReducers({
  dishes,
  organizations,
});
