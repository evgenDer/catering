import { combineReducers } from 'redux';

import dishes from './dishes';
import organizationReducer from './organizations';
import userReducer from './user';
import roles from './roles';

export default combineReducers({
  dishes,
  roles,
  user: userReducer.user,
  users: userReducer.users,
  organization: organizationReducer.organization,
  organizations: organizationReducer.organizations,
});
