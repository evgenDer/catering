import {
  CURRENT_USER,
  LOGIN,
  LOGOUT,
  REGISTER,
} from 'constants/actionTypes';

const initialState = {
  authorized: false,
  token: null,
};

export default (user = initialState, action) => {
  console.log(action.payload);
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
