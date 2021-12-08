import * as types from 'constants/actionTypes';
import { MEALS } from 'constants/application';

export default (consumptions = {}, action) => {
  switch (action.type) {
  case types.RETRIEVE_CONSUMPTION:
    return action.payload || {};
  case types.DELETE_CONSUMPTION_RECORD: {
    const { id, meal } = action.payload;
    const { dishes, total } = consumptions[meal];
    const dish = dishes.find(({ consumptionId }) => consumptionId === id);
    const { count } = dish;

    return {
      ...consumptions,
      [meal]: {
        dishes: dishes.filter(({ consumptionId }) => consumptionId !== id),
        total: {
          protein: total.protein - dish.protein * count,
          fat: total.fat - dish.fat * count,
          carbohydrates: total.carbohydrates - dish.carbohydrates * count,
          calories: total.calories - dish.calories * count,
        },
      },
    };
  }
  case types.CREATE_CONSUMPTION_RECORD: {
    const { dish, meal } = action.payload;

    return {
      ...consumptions,
      [meal]: {
        dishes: consumptions[meal]?.dishes.length ? [...consumptions[meal].dishes, dish] : [dish],
        total: consumptions[meal]?.total ? {
          protein: consumptions[meal]?.total.protein + dish.protein * dish.count,
          fat: consumptions[meal]?.total.fat + dish.fat * dish.count,
          carbohydrates: consumptions[meal]?.total.carbohydrates + dish.carbohydrates * dish.count,
          calories: consumptions[meal]?.total.calories + dish.calories * dish.count,
        } : {
          protein: dish.protein * dish.count,
          fat: dish.fat * dish.count,
          carbohydrates: dish.carbohydrates * dish.count,
          calories: dish.calories * dish.count,
        },
      },
    };
  }
  default:
    return consumptions;
  }
};
