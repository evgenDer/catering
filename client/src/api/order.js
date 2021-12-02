import { http } from './config';

export const createOrder = async (order) => {
  try {
    const response = await http.post(
      'orders',
      order,
    );

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getAllOrders = async () => {
  try {
    const response = await http.get('/orders');

    return response;
  } catch (error) {
    return error;
  }
};

export const updateOrder = async (orderId, status) => {
  try {
    const response = await http.patch(
      `orders/${orderId}`,
      {
        status,
      },
    );

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getUserActiveOrders = async (accountId) => {
  try {
    const response = await http.get(`orders/account/${accountId}/active`);

    return response;
  } catch (error) {
    return error;
  }
};

export const getUserOrders = async (accountId) => {
  try {
    const response = await http.get(`orders/account/${accountId}`);

    return response;
  } catch (error) {
    return error;
  }
};
