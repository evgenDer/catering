import * as UserService from 'api/user';

import * as types from 'constants/actionTypes';
import { ROLES } from 'constants/application';

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

export const getAllUsers = () => async (dispatch, getState) => {
  try {
    const { profile, roleName } = getState().user;
    const { data } = roleName === ROLES.ADMIN
      ? await UserService.getAllUsers()
      : await UserService.getUsersFromOrganization(profile.organizationId);

    dispatch({
      type: types.RETRIEVE_USERS,
      payload: data,
    });

    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
};
