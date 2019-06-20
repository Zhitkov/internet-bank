"use strict";

import auth from './../../modules/auth.js';
import { processApiError } from './../user.js';


export const REQUEST_PAYMENT_SERVICES_LIST = 'REQUEST_PAYMENT_SERVICES_LIST';

const requestPaymentServices = () => ({
    type: REQUEST_PAYMENT_SERVICES_LIST
});


export const REQUEST_PAYMENT_SERVICES_LIST_SUCCESS = 'REQUEST_PAYMENT_SERVICES_LIST_SUCCESS';

const requestPaymentServicesSuccess = paymentServices => ({
    type: REQUEST_PAYMENT_SERVICES_LIST_SUCCESS,
    paymentServices
});


export const REQUEST_PAYMENT_SERVICES_LIST_ERROR = 'REQUEST_PAYMENT_SERVICES_LIST_ERROR';

const requestPaymentServicesError = error => ({
    type: REQUEST_PAYMENT_SERVICES_LIST_ERROR,
    error
});


export const getPaymentServices = () => dispatch => {
    dispatch(requestPaymentServices());

    return auth.authorizedCall('web.services.getList')
        .then(result => {
            dispatch(requestPaymentServicesSuccess(result));
        })
        .catch(error => {
            processApiError(error, dispatch, () => {
                dispatch(requestPaymentServicesError(error.message));
            })
        });
};



