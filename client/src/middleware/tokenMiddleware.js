import * as types from '../constants/actionTypes';

const tokenMiddleware = () => (next) => (action) => {
  if (action.type === types.LOGIN) {
    localStorage.setItem('token', action.payload);
  } else if (action.type === types.LOGOUT) {
    localStorage.removeItem('token');
  }

  next(action);
};

export default tokenMiddleware;
