import { createStore } from 'redux';
// import thunk from 'redux-thunk';
import reducer from '../reducers';

const configureStore = () => {
	// const middleware = [thunk, tokenMiddleware];

	let initialState = {
		authorized: false,
		token: null
	};

	// if (token) {
	// 	initialState = {
	// 		...initialState,
	// 		authorized: true,
	// 		token
	// 	};
	// }

	return createStore(reducer, initialState);
};

export default configureStore;
