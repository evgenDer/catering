import {
  CURRENT_USER,
  LOGIN,
  LOGOUT,
  REGISTER,
} from 'constants/actionTypes';
import { getToken } from 'utils/token';

const initialState = {
  authorized: !!getToken(),
  token: getToken(),
};

export default (user = initialState, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...user,
      authorized: true,
      token: action.payload,
    };

  case LOGOUT:
    return {
      ...user,
      authorized: false,
      token: null,
    };

  case REGISTER:
    return {
      ...user,
      authorized: true,
      token: action.payload,
    };

  case CURRENT_USER:
    return {
      ...user,
      ...action.payload.user,
    };

  default:
    return user;
  }
};
