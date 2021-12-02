import {
  RETRIEVE_ORDERS,
  RETRIEVE_ACTIVE_ORDERS,
  RETRIEVE_USER_ORDERS,
  UPDATE_ORDER_STATUS,
} from 'constants/actionTypes';

const orderReducer = {
  orders: (orders = [], action) => {
    switch (action.type) {
    case RETRIEVE_ORDERS:
      return action.payload || [];
    case RETRIEVE_USER_ORDERS:
      return action.payload || [];
    case UPDATE_ORDER_STATUS:
      return orders.map((order) => {
        if (order.id === action.payload.id) {
          return {
            ...order,
            ...action.payload,
          };
        }

        return order;
      });

    default:
      return orders;
    }
  },
  activeOrders: (activeOrders = [], action) => {
    switch (action.type) {
    case RETRIEVE_ACTIVE_ORDERS:
      return action.payload || [];
    default:
      return activeOrders;
    }
  },
};

export default orderReducer;
