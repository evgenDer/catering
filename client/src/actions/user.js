import * as UserService from 'api/user';

import * as types from 'constants/actionTypes';

export const login = (username, password) => async (dispatch) => {
  try {
    const { data } = await UserService.login(username, password);

    dispatch({
      type: types.LOGIN,
      payload: data.token,
    });

    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const register = (user) => async (dispatch) => {
  try {
    const { data } = await UserService.register(user);

    dispatch({
      type: types.REGISTER,
      payload: data.token,
    });

    console.log(data);
    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');

  dispatch({ type: types.LOGOUT });
};

export const getCurrentUser = () => async (dispatch) => {
  try {
    const { data } = await UserService.getCurrentUser();

    dispatch({
      type: types.CURRENT_USER,
      payload: data,
    });

    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
};
