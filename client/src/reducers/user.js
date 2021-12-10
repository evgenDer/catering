import {
  CURRENT_USER,
  LOGIN,
  LOGOUT,
  REGISTER,
  RETRIEVE_USERS,
  RETRIEVE_CURRENT_FRIEND,
  UPDATE_USER_GOAL_CALORIES,
} from 'constants/actionTypes';
import { getToken } from 'utils/token';

const initialState = {
  authorized: !!getToken(),
  token: getToken(),
  loading: false,
};

export const currentUser = (state) => state.user;
export const currentUserFriend = (state) => state.currentFriend;

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

    case UPDATE_USER_GOAL_CALORIES:
      return {
        ...user,
        profile: action.payload,
      };

    default:
      return user;
    }
  },
  users: (users = [], action) => {
    switch (action.type) {
    case RETRIEVE_USERS:
      return action.payload || [];
    default:
      return users;
    }
  },
  currentFriend: (currentFriend = {}, action) => {
    switch (action.type) {
    case RETRIEVE_CURRENT_FRIEND:

      return action.payload || {};
    default:
      return currentFriend;
    }
  },
};

export default userReducer;
