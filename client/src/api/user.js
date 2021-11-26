import { http } from './config';

export const login = async (username, password) => {
  try {
    const response = await http.post('auth/login', {
      email: username,
      password,
    });

    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const register = async (userData) => {
  try {
    const response = await http.post('auth/register', userData);

    return response;
  } catch (e) {
    return e;
  }
};

export const getCurrentUser = async (userData) => {
  try {
    const response = await http.get('users/current', userData);

    return response;
  } catch (e) {
    return e;
  }
};
