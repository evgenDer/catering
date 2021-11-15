export const PROD_BASE_URL = '';
export const DEV_BASE_URL = 'http://localhost:4000/';

export const config = {
  apiBaseUrl:
    process.env.NODE_ENV === 'production' ? PROD_BASE_URL : DEV_BASE_URL,
};

export const HTTP_STATUSES = {
  SUCCESSFUL: 200,
  CREATED: 201,
};
