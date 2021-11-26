import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import tokenMiddleware from 'middleware/tokenMiddleware';

import reducer from '../reducers';

const configureStore = () => createStore(reducer, applyMiddleware(thunk, tokenMiddleware));

export default configureStore;
