"use strict";

import {
    REQUEST_ACCOUNT_DETAILS,
    ACCOUNT_DETAILS_SUCCESS,
    ACCOUNT_DETAILS_ERROR
} from '../../actions/accounts/accountDetailsActions';
import {
    createDataState,
    dataStateToRequesting,
    resolveDataForDataState,
    dataStateToError
} from '../../modules/data/dataState';


const defaultAccountDetailsState = createDataState();


const accountDetailsReducer = (state = defaultAccountDetailsState, action = {}) => {
    switch (action.type) {
        case REQUEST_ACCOUNT_DETAILS:
            return dataStateToRequesting(state);

        case ACCOUNT_DETAILS_SUCCESS:
            return resolveDataForDataState(state, action.accountDetails);

        case ACCOUNT_DETAILS_ERROR:
            return dataStateToError(state, action.error);

        default:
            return state;
    }
};


export default accountDetailsReducer;