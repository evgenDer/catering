import { http } from './config';

export const getAllPurchasedProducts = async () => {
  try {
    const response = await http.get('/dishes/purchase');

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const deletePurchasedDishes = async (dishId) => {
  try {
    const response = await http.delete(
      `dishes/purchase/${dishId}`,
    );

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const updatePurchaseDish = async (dishId, purchaseDish) => {
  try {
    const response = await http.put(
      `dishes/purchase/${dishId}`,
      purchaseDish,
    );

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const createPurchaseDish = async (purchaseDish) => {
  try {
    const response = await http.post(
      'dishes/purchase',
      purchaseDish,
    );

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
