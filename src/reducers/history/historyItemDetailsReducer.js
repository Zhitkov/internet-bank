"use strict";

import {
    HISTORY_GET_ITEM_DETAILS_REQUEST,
    HISTORY_GET_ITEM_DETAILS_SUCCESS,
    HISTORY_GET_ITEM_DETAILS_ERROR
} from '../../actions/history/historyItemDetailsActions';

import {
    createDataState,
    dataStateToRequesting,
    resolveDataForDataState,
    dataStateToError
} from '../../modules/data/dataState';

const defaultState = createDataState({});

const historyItemDetailsReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case HISTORY_GET_ITEM_DETAILS_REQUEST:
            return dataStateToRequesting(state);

        case HISTORY_GET_ITEM_DETAILS_SUCCESS:
            return resolveDataForDataState(state, action.data);

        case HISTORY_GET_ITEM_DETAILS_ERROR:
            return dataStateToError(state, action.error);

        default:
            return state;
    }
};

export default historyItemDetailsReducer;