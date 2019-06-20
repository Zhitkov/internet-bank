"use strict";

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from './reducers';

const loggerMiddleware = createLogger();

const configureStore = (preloadedState) => {
    return createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(
            loggerMiddleware,
            routerMiddleware(browserHistory),
            thunkMiddleware
        )
    );
};

export default configureStore;