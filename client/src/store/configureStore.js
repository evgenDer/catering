import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

const configureStore = () => {
  // const middleware = [thunk, tokenMiddleware];

  const initialState = {
    authorized: false,
    token: null,
  };

  // if (token) {
  // 	initialState = {
  // 		...initialState,
  // 		authorized: true,
  // 		token
  // 	};
  // }

  return createStore(reducer, initialState, applyMiddleware(thunk));
};

export default configureStore;
