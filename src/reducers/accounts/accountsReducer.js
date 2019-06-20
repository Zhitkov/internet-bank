"use strict";

import {
    REQUEST_ACCOUNTS_LIST,
    REQUEST_ACCOUNTS_LIST_SUCCESS,
    REQUEST_ACCOUNTS_LIST_ERROR
} from '../../actions/accounts/accountsActions';

import {
    createDataState,
    dataStateToRequesting,
    resolveDataForDataState,
    dataStateToError
} from '../../modules/data/dataState';

const defaultAccounts = createDataState([]);

const accountsReducer = (state = defaultAccounts, action = {}) => {
    switch(action.type) {
        case REQUEST_ACCOUNTS_LIST:
            return dataStateToRequesting(state);

        case REQUEST_ACCOUNTS_LIST_SUCCESS:
            return resolveDataForDataState(state, action.accounts);

        case REQUEST_ACCOUNTS_LIST_ERROR:
            return dataStateToError(state, action.error);

        default:
            return state;
    }
};

export default accountsReducer;