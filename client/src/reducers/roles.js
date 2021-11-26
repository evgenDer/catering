import * as types from '../constants/actionTypes';

export default (roles = [], action) => {
  switch (action.type) {
  case types.RETRIEVE_ROLES:
    return action.payload;
  default:
    return roles;
  }
};
