import * as types from 'constants/actionTypes';
import * as OrderService from 'api/order';

export const getAllOrders = () => async (dispatch) => {
  try {
    const { data } = await OrderService.getAllOrders();

    dispatch({
      type: types.RETRIEVE_ORDERS,
      payload: data,
    });

    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getAllUserOrders = () => async (dispatch, getState) => {
  try {
    const { profile } = getState().user;
    const { data } = await OrderService.getUserOrders(
      profile.account.id,
    );

    dispatch({
      type: types.RETRIEVE_USER_ORDERS,
      payload: data,
    });

    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getAllUserActiveOrders = () => async (dispatch, getState) => {
  try {
    const { profile } = getState().user;
    const { data } = await OrderService.getUserActiveOrders(
      profile.account.id,
    );

    dispatch({
      type: types.RETRIEVE_ACTIVE_ORDERS,
      payload: data,
    });

    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateOrder = (orderId, status) => async (dispatch) => {
  try {
    const { data } = await OrderService.updateOrder(orderId, status);

    dispatch({
      type: types.UPDATE_ORDER_STATUS,
      payload: data,
    });

    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
};
