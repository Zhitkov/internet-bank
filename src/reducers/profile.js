"use strict";

import {
    PROFILE_GET_REQUEST,
    PROFILE_GET_SUCCESS,
    PROFILE_GET_ERROR
} from './../actions/profile.js';

import {
    createDataState,
    dataStateToRequesting,
    resolveDataForDataState,
    dataStateToError,
    dataStateToUpdate
} from './../modules/data/dataState.js';

const defaultState = createDataState();

const profileReducer = (state = defaultState, action = {}) => {
    switch(action.type) {
        case PROFILE_GET_REQUEST:
            return dataStateToRequesting(state);

        case PROFILE_GET_SUCCESS:
            return resolveDataForDataState(state, action.profile);

        case PROFILE_GET_ERROR:
            return dataStateToError(state, action.error);

        default:
            return state;
    }
};

export default profileReducer;