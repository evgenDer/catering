import * as ConsumptionService from 'api/consumption';
import * as types from 'constants/actionTypes';

export const getAllConsumption = (userId) => async (dispatch, getState) => {
  const { user } = getState();
  const { data } = await ConsumptionService.getAllConsumption(userId || user.id);

  dispatch({
    type: types.RETRIEVE_CONSUMPTION,
    payload: data,
  });

  return Promise.resolve(data);
};

export const deleteConsumption = (id, meal) => async (dispatch) => {
  try {
    await ConsumptionService.deleteConsumption(id);

    dispatch({
      type: types.DELETE_CONSUMPTION_RECORD,
      payload: { id, meal },
    });
  } catch (err) {
    console.error(err);
  }
};

export const createConsumption = (dish, meal, count) => async (dispatch) => {
  try {
    const { data } = await ConsumptionService.createCustomConsumption(dish, meal, count);

    dispatch({
      type: types.CREATE_CONSUMPTION_RECORD,
      payload: { meal, dish: data },
    });

    return Promise.resolve(data);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};
