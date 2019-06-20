"use strict";

import { push } from 'react-router-redux';
import auth from './../modules/auth.js';
import {
    API_ERROR_GENERAL,
    API_ERROR_SESSION,
    ERRORS_AWAITING_TIME
} from './../constants.js';
import { processApiError } from './user.js';
import languagesHelper from './../modules/LanguagesHelper.js';

/*

 Load all settings by one request

 */

export const APP_SETTINGS_LOAD_REQUEST = 'APP_SETTINGS_LOAD_REQUEST';
export const appSettingsLoadRequest = () => {
    return {
        type: APP_SETTINGS_LOAD_REQUEST
    }
};

export const APP_SETTINGS_LOAD_SUCCESS = 'APP_SETTINGS_LOAD_SUCCESS';
export const appSettingsLoadSuccess = (settings) => {
    return {
        type: APP_SETTINGS_LOAD_SUCCESS,
        appSettings: settings
    }
};

export const APP_SETTINGS_LOAD_FAILED = 'APP_SETTINGS_LOAD_FAILED';
export const appSettingsLoadFailed = (error) => {
    return {
        type: APP_SETTINGS_LOAD_FAILED,
        error: error
    }
};

/*

 Localization

 */
export const ACTIVE_LOCALIZATION_CHANGE = 'ACTIVE_LOCALIZATION_CHANGE';
export const activeLocalizationChange = (newLocalization) => {
    return {
        type: ACTIVE_LOCALIZATION_CHANGE,
        newLocalization: newLocalization
    }
};