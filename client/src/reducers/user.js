import {
  CURRENT_USER,
  LOGIN,
  LOGOUT,
  REGISTER,
  RETRIEVE_USERS,
} from 'constants/actionTypes';
import { getToken } from 'utils/token';

const initialState = {
  authorized: !!getToken(),
  token: getToken(),
  loading: false,
};

const userReducer = {
  user: (user = initialState, action) => {
    switch (action.type) {
    case LOGIN:
      return {
        ...user,
        loading: true,
        authorized: true,
        token: action.payload,
      };

    case LOGOUT:
      return {
        authorized: false,
        token: null,
      };

    case REGISTER:
      return {
        ...user,
        authorized: true,
        loading: true,
        token: action.payload,
      };

    case CURRENT_USER:
      return {
        ...user,
        ...action.payload,
        loading: false,
      };

    default:
      return user;
    }
  },
  users: (users = [], action) => {
    switch (action.type) {
    case RETRIEVE_USERS:
      return action.payload;
    default:
      return users;
    }
  },
};

export default userReducer;
