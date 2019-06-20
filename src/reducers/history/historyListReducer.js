"use strict";

import {
    HISTORY_GET_LIST_REQUEST,
    HISTORY_GET_LIST_SUCCESS,
    HISTORY_GET_LIST_ERROR
} from './../../actions/history/actions.js';

import {
    createDataState,
    dataStateToRequesting,
    resolveDataForDataState,
    dataStateToError
} from '../../modules/data/dataState';

const defaultState = createDataState([]);

const historyListReducer = (state = defaultState, action = {}) => {
    switch(action.type) {
        case HISTORY_GET_LIST_REQUEST:
            return dataStateToRequesting(state);

        case HISTORY_GET_LIST_SUCCESS:
            return resolveDataForDataState(state, action.data);

        case HISTORY_GET_LIST_ERROR:
            return dataStateToError(state, action.error);

        default:
            return state;
    }
};

export default historyListReducer;