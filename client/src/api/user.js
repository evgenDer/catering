import { http } from './config';

export const login = async (username, password) => {
  try {
    const response = await http.post('auth/login', {
      email: username,
      password,
    });

    return response;
  } catch (e) {
    console.error(e);
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

export const getAllUsers = async () => {
  try {
    const response = await http.get('/users');

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getUsersFromOrganization = async (organizationId) => {
  try {
    const response = await http.get(`/users/organization/${organizationId}`);

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
