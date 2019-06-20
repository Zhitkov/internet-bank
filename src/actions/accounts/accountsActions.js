"use strict";

import auth from './../../modules/auth.js';
import { processApiError } from './../user.js';
import { convertAccountEDForClient } from '../../modules/AccountsHelpers';


/*

    Accounts list

 */


export const REQUEST_ACCOUNTS_LIST = 'REQUEST_ACCOUNTS_LIST';
const requestAccountsList = () => {
    return {
        type: REQUEST_ACCOUNTS_LIST
    }
};


export const REQUEST_ACCOUNTS_LIST_SUCCESS = 'REQUEST_ACCOUNTS_LIST_SUCCESS';
/**
 * @param {Array.<IAccountED>} accounts
 * @return {{type: string, accounts: *}}
 */
const requestAccountsListSuccess = accounts => {
    return {
        type: REQUEST_ACCOUNTS_LIST_SUCCESS,
        accounts: accounts
    }
};


export const REQUEST_ACCOUNTS_LIST_ERROR = 'REQUEST_ACCOUNTS_LIST_ERROR';
const requestAccountsListError = error => {
    return {
        type: REQUEST_ACCOUNTS_LIST_ERROR,
        error: error
    }
};


export const getAccountsList = () => {
    return (dispatch) => {
        dispatch(requestAccountsList());
        return auth.authorizedCall('web.accounts.getList', {})
            .then((result) => {
                const accountsData = result.accounts.map(accountAPIED => convertAccountEDForClient(accountAPIED));
                dispatch(
                     requestAccountsListSuccess(accountsData)
                );
            })
            .catch((error) => {
                processApiError(error, dispatch, () => {
                    dispatch(
                        requestAccountsListError(error.message)
                    );
                })
            });
    }
};