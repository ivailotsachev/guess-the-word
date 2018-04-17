import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const reducer = (state={}, action) => {
    return state;
};

const middleware = applyMiddleware(logger, thunk);
const store = createStore(reducer, middleware);

export default store;