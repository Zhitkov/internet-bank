"use strict";

import auth from './../../modules/auth.js';
import { processApiError } from './../user.js';
import { convertAccountEDForClient } from '../../modules/AccountsHelpers';


export const REQUEST_ACCOUNT_DETAILS = 'REQUEST_ACCOUNT_DETAILS';
const requestAccountDetailsAction = () => ({
    type: REQUEST_ACCOUNT_DETAILS
});


export const ACCOUNT_DETAILS_SUCCESS = 'ACCOUNT_DETAILS_SUCCESS';
/**
 * @param {IAccountED} accountDetails
 * @return {{type: string, accountDetails: *}}
 */
const accountDetailsSuccessAction = accountDetails => ({
    type: ACCOUNT_DETAILS_SUCCESS,
    accountDetails
});


export const ACCOUNT_DETAILS_ERROR = 'ACCOUNT_DETAILS_ERROR';
const accountDetailsErrorAction = errorMessage => ({
    type: ACCOUNT_DETAILS_ERROR,
    error: errorMessage
});

/**
 * @typedef {Object} IAccountSelector
 * @property {string} externalId
 */

/**
 * @param {IAccountSelector} accountSelector
 */
export const getAccountDetailsAction = accountSelector =>
    dispatch => {
        dispatch(requestAccountDetailsAction());

        // TODO: [dmitry.makhnev] change request to needed account when api will add supporting
        return auth.authorizedCall('web.accounts.getList', {})
            .then(result => {
                const requestedAccountData = result.accounts.find(
                    accountData => accountData.external_id === accountSelector.externalId
                );

                if (requestedAccountData) {
                    const accountData = convertAccountEDForClient(requestedAccountData);
                    dispatch(
                        accountDetailsSuccessAction(accountData)
                    );
                } else {
                    dispatch(
                        accountDetailsErrorAction('account_details:account-details-not-found-error')
                    );
                }
            })
            .catch(error => {
                processApiError(error, dispatch, () => {
                    dispatch(accountDetailsErrorAction(error.message));
                })
            });
    };