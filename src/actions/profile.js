"use strict";

import auth from './../modules/auth.js';
import { push } from 'react-router-redux';
import {
    API_ERROR_GENERAL,
    API_ERROR_SESSION
} from './../constants.js';
import {
    processApiError
} from './user.js';

/*

    Get profile

 */

export const PROFILE_GET_REQUEST = 'PROFILE_GET_REQUEST';
const profileGetRequest = () => {
    return {
        type: PROFILE_GET_REQUEST
    }
};

export const PROFILE_GET_SUCCESS = 'PROFILE_GET_SUCCESS';
const profileGetSuccess = (newProfile) => {
    return {
        type: PROFILE_GET_SUCCESS,
        profile: newProfile
    }
};

export const PROFILE_GET_ERROR = 'PROFILE_GET_ERROR';
const profileGetError = (error) => {
    return {
        type: PROFILE_GET_ERROR,
        error: error
    }
};

export const profileGet = () => {
    return (dispatch) => {
        dispatch(profileGetRequest());
        return auth.authorizedCall('web.profile.get', {})
            .then((result) => {
                dispatch(profileGetSuccess(result['profile']));
            })
            .catch((error) => {
                processApiError(error, dispatch, () => {
                    dispatch(profileGetError(error.message));
                });
            });
    }
};