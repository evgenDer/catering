import axios from 'axios';
import { config } from 'constants/api';

export const getAllPurchasedProducts = async () => {
  try {
    const response = await axios.get(
      `${config.apiBaseUrl}dishes/purchase`,
    );

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const deletePurchasedDishes = async (dishId) => {
  try {
    const response = await axios.delete(
      `${config.apiBaseUrl}dishes/purchase/${dishId}`,
    );

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const updatePurchaseDish = async (dishId, purchaseDish) => {
  try {
    const response = await axios.put(
      `${config.apiBaseUrl}dishes/purchase/${dishId}`,
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
    const response = await axios.post(
      `${config.apiBaseUrl}dishes/purchase`,
      purchaseDish,
    );

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
