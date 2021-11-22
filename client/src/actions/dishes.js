import * as DishService from 'api/dishes';
import { HTTP_STATUSES } from 'constants/api';

import * as types from '../constants/actionTypes';

// TODO: rename api
export const getAllPurchasedDishes = () => async (dispatch) => {
  const { data, status } = await DishService.getAllPurchasedProducts();

  if (HTTP_STATUSES.SUCCESSFUL === status) {
    dispatch({
      type: types.RETRIEVE_PURCHASED_DISHES,
      payload: data,
    });
  }
};

export const deletePurchaseDish = (id) => async (dispatch) => {
  try {
    await DishService.deletePurchasedDishes(id);

    dispatch({
      type: types.DELETE_PURCHASED_DISHES,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

// TODO: handler exception
export const updatePurchaseDish = (id, dish) => async (dispatch) => {
  try {
    const res = await DishService.updatePurchaseDish(id, dish);

    dispatch({
      type: types.UPDATE_PURCHASED_DISHES,
      payload: dish,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const createPurchaseDish = (dish) => async (dispatch) => {
  try {
    const res = await DishService.createPurchaseDish(dish);

    dispatch({
      type: types.CREATE_PURCHASED_DISHES,
      payload: res.data.dish,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};
