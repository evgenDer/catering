import * as AuthService from 'api/user';

import * as types from 'constants/actionTypes';

export const login = (username, password) => async (dispatch) => {
  try {
    const { data } = await AuthService.login(username, password);

    debugger;
    console.log(data);
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
    const { data } = await AuthService.register(user);

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

export const logout = () => ({ type: types.LOGOUT });

export const getCurrentUser = () => async (dispatch) => {
  try {
    const { data } = await AuthService.getCurrentUser();

    console.log(data);
    dispatch({
      type: types.CURRENT_USER,
      payload: data.user,
    });

    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
};
