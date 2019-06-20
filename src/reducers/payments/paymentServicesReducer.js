"use strict";


import {
    REQUEST_PAYMENT_SERVICES_LIST,
    REQUEST_PAYMENT_SERVICES_LIST_ERROR,
    REQUEST_PAYMENT_SERVICES_LIST_SUCCESS
} from '../../actions/payments/paymentServicesActions';
import {
    createDataState,
    dataStateToRequesting,
    resolveDataForDataState,
    dataStateToError
} from '../../modules/data/dataState';


const defaultPaymentServicesState = createDataState();


const paymentServicesReducer = (state = defaultPaymentServicesState, action = {}) => {
    switch (action.type) {
        case REQUEST_PAYMENT_SERVICES_LIST:
            return dataStateToRequesting(state);

        case REQUEST_PAYMENT_SERVICES_LIST_SUCCESS:
            return resolveDataForDataState(state, action.paymentServices);

        case REQUEST_PAYMENT_SERVICES_LIST_ERROR:
            return dataStateToError(state, action.error);

        default:
            return state;
    }
};


export default paymentServicesReducer;