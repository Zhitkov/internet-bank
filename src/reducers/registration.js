"use strict";

import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_ERROR
} from './../actions/registration.js';

import {
    createDataState,
    dataStateToRequesting,
    resolveDataForDataState,
    dataStateToError,
    dataStateToUpdate
} from './../modules/data/dataState.js';

const defaultState = createDataState();

const registrationReducer = (state = defaultState, action = {}) => {
    switch(action.type) {
        case USER_REGISTER_REQUEST:
            return dataStateToRequesting(state);

        case USER_REGISTER_SUCCESS:
            return resolveDataForDataState(state, {});

        case USER_REGISTER_ERROR:
            return dataStateToError(state, action.error);

        default:
            return state;
    }
};

export default registrationReducer;