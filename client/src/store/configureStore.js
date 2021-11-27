import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import tokenMiddleware from 'middleware/tokenMiddleware';

import reducer from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk, tokenMiddleware)),
);

export default configureStore;
