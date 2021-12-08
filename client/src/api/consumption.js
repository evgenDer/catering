import { http } from './config';

export const getAllConsumption = async () => {
  try {
    const response = await http.get(
      'consumptions',
    );

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const deleteConsumption = async (consumptionId) => {
  try {
    const response = await http.delete(
      `consumptions/${consumptionId}`,
    );

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const createCustomConsumption = async (dish, meal, count) => {
  try {
    const response = await http.post(
      'consumptions',
      {
        dish,
        meal,
        count,
      },
    );

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
