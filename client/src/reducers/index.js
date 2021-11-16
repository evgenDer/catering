import * as types from '../constants/actionTypes';

const initialState = {
	drawerVisible: false,
	authorized: true,
	token: null,
	dishes: null,
	productLoading: false,
	product: null,
	ordersStatus: null,
	orders: null,
	order: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case types.CLOSE_DRAWER:
			return {
				...state,
				drawerVisible: false
			};
		case types.TOGGLE_DRAWER:
			return {
				...state,
				drawerVisible: !state.drawerVisible
			};
		case types.LOGIN:
			return {
				...state,
				authorized: true,
				token: action.token
			};

		case types.LOGOUT:
			return {
				...state,
				authorized: false,
				token: null
			};

		case types.RECEIVE_DISHES_LIST:
			return {
				...state,
				dishes: action.dishes
			};

		case types.RECEIVE_PRODUCT_BEGIN:
			return {
				...state,
				productLoading: true,
				product: null
			};

		case types.RECEIVE_PRODUCT_COMPLETED:
			return {
				...state,
				productLoading: false,
				product: action.product
			};

		case types.RECEIVE_ORDERS_LIST:
			return {
				...state,
				ordersStatus: action.status,
				orders: action.orders
			};

		case types.RECEIVE_ORDER:
			return {
				...state,
				order: action.order
			};

		default:
			return state;
	}
};
