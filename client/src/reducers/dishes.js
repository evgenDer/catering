import * as types from '../constants/actionTypes';

const initialState = [];

export default (dishes = initialState, action) => {
  switch (action.type) {
  case types.RETRIEVE_PURCHASED_DISHES:
    return action.payload;
  case types.DELETE_PURCHASED_DISHES:
    return dishes.filter(({ id }) => id !== action.payload.id);
  case types.UPDATE_PURCHASED_DISHES:
    return dishes.map((dish) => {
      if (dish.id === action.payload.id) {
        return {
          ...dish,
          ...action.payload,
        };
      }

      return dish;
    });
  case types.CREATE_PURCHASED_DISHES:
    return [...dishes, action.payload];
  default:
    return dishes;
  }
};
