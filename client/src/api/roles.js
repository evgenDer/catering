import { http } from './config';

export const getRoles = async () => {
  try {
    const response = await http.get('/roles');

    return response;
  } catch (e) {
    return e;
  }
};
