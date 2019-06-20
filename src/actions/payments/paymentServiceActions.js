"use strict";

import auth from './../../modules/auth.js';
import { processApiError } from './../user.js';
import { preparePaymentServiceFieldsValuesForServer } from '../../modules/paymentServicesHelpers';


export const REQUEST_START_PAYMENT_SERVICE = 'REQUEST_START_PAYMENT_SERVICE';
const requestStartPaymentService = () => ({
    type: REQUEST_START_PAYMENT_SERVICE
});


export const PAYMENT_SERVICE_STARTED = 'PAYMENT_SERVICE_STARTED';
const paymentServiceStarted = paymentService => ({
    type: PAYMENT_SERVICE_STARTED,
    paymentService
});


export const START_PAYMENT_SERVICE_ERROR = 'START_PAYMENT_SERVICE_ERROR';
const startPaymentServiceError = error => ({
    type: START_PAYMENT_SERVICE_ERROR,
    error
});


export const startPaymentService = serviceId => dispatch => {
    dispatch(requestStartPaymentService());
    return auth.authorizedCall('web.services.start', { serviceId })
        .then(result => {
            dispatch(paymentServiceStarted(result));
        })
        .catch(error => {
            processApiError(error, dispatch, () => {
                dispatch(startPaymentServiceError(error.text));
            })
        });
};


export const START_CONTINUE_PAYMENT_SERVICE = 'START_CONTINUE_PAYMENT_SERVICE';
const startContinuePaymentService = () => ({
    type: START_CONTINUE_PAYMENT_SERVICE
});


export const PAYMENT_SERVICE_CONTINUED = 'PAYMENT_SERVICE_CONTINUED';
const paymentServiceContinued = paymentService => ({
    type: PAYMENT_SERVICE_CONTINUED,
    paymentService
});


/**
 * @param {IPaymentServiceED} paymentService
 * @param {Object.<string, number|string>} values
 */
export const continuePaymentService = (paymentService, values) => dispatch => {
    dispatch(startContinuePaymentService());

    const paymentServiceApiFields = preparePaymentServiceFieldsValuesForServer(paymentService, values);

    return auth.authorizedCall(
            "web.services.continue",
            {
                operationId: paymentService.operationId,
                fields: paymentServiceApiFields
            }
        )
        .then(result => {
            dispatch(paymentServiceContinued(result));
        })
        .catch(error => {
            processApiError(error, dispatch, () => {
                dispatch(startPaymentServiceError(error.text));
            })
        });
};
