"use strict";

import auth from './../modules/auth.js';
import { processApiError } from './user.js';
import { $l } from './../modules/LanguagesHelper.js';

export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
const userRegisterRequest = () => ({
    type: USER_REGISTER_REQUEST
});

export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
const userRegisterSuccess = () => ({
    type: USER_REGISTER_SUCCESS
});

export const USER_REGISTER_ERROR = 'USER_REGISTER_ERROR';
const userRegisterError = error => ({
    type: USER_REGISTER_ERROR,
    error: error
});

export const userRegister = data => {
    return (dispatch) => {
        dispatch(userRegisterRequest());
        return auth.unAuthorizedCall('web.auth.register', data)
            .then(result => {
                dispatch(userRegisterSuccess());
            })
            .catch(error => {
                processApiError(error, dispatch, () => {
                    dispatch(userRegisterError(error.message));
                });
            });
    }
};
