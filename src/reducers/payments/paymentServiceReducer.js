"use strict";


import {
    REQUEST_START_PAYMENT_SERVICE,
    PAYMENT_SERVICE_STARTED,
    START_PAYMENT_SERVICE_ERROR,
    START_CONTINUE_PAYMENT_SERVICE,
    PAYMENT_SERVICE_CONTINUED
} from '../../actions/payments/paymentServiceActions';
import {
    createDataState,
    dataStateToRequesting,
    resolveDataForDataState,
    dataStateToError,
    dataStateToUpdate
} from '../../modules/data/dataState';

/**
 * @typedef {Object} IPaymentServiceED
 * @property {number} currentStepIndex
 * @property {string} operationId
 * @property {Array.<string>} steps
 * @property {Array.<IPaymentServiceFieldBase>} fields
 * @property {Array.<Object>} errors
 */

const defaultPaymentServiceState = createDataState();


const paymentServiceReducer = (state = defaultPaymentServiceState, action = {}) => {
    switch (action.type) {

        case REQUEST_START_PAYMENT_SERVICE:
            return dataStateToRequesting(state);

        case PAYMENT_SERVICE_STARTED:
            return resolveDataForDataState(state, action.paymentService);

        case START_PAYMENT_SERVICE_ERROR:
            return dataStateToError(state, action.error);

        case START_CONTINUE_PAYMENT_SERVICE:
            return dataStateToUpdate(state);

        case PAYMENT_SERVICE_CONTINUED:
            return resolveDataForDataState(state, action.paymentService);

        default:
            return state;
    }
};


export default paymentServiceReducer;