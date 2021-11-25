import axios from 'axios';
import { set } from 'lodash';

import { HTTP_STATUSES, SERVER_URL } from 'constants/api';
import { LOGOUT } from 'constants/actionTypes';
// TODO: think how to do it correct

const http = axios.create({
  baseURL: SERVER_URL,
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    set(config.headers, 'authorization', `Bearer ${token}`);
  }

  return config;
});

http.interceptors.response.use(
  (response) => response, (error) => {
    if (error.response.status === HTTP_STATUSES.UNAUTHORIZED) {
      localStorage.removeItem('token');
    }

    return Promise.reject(error);
  },
);

export { http };
