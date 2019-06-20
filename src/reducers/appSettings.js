"use strict";

import {
    APP_SETTINGS_LOAD_REQUEST,
    APP_SETTINGS_LOAD_SUCCESS,
    APP_SETTINGS_LOAD_FAILED,
    ACTIVE_LOCALIZATION_CHANGE
} from './../actions/appSettings.js';

const defaultState = {
    isRequesting: false,
    isError: false,
    errorText: '',
    localization: [],
    dataSets: {},
    settings: {},
    activeLocalization: 'en'
};

const appSettingsReducer = (state = defaultState, action = {}) => {
    switch(action.type) {
        case APP_SETTINGS_LOAD_REQUEST:
            return Object.assign({}, state, {
                isRequesting: true
            });
            break;

        case APP_SETTINGS_LOAD_SUCCESS:
            return Object.assign({}, state, {
                isRequesting: false,
                localization: action.appSettings['localization'],
                dataSets: action.appSettings['dataSets'],
                settings: action.appSettings['settings']
            });
            break;

        case APP_SETTINGS_LOAD_FAILED:
            return Object.assign({}, state, {
                isRequesting: false,
                isError: true,
                errorText: action.error
            });
            break;

        case ACTIVE_LOCALIZATION_CHANGE:
            return Object.assign({}, state, {
                activeLocalization: action.newLocalization
            });
            break;

        default:
            return state;
            break;
    }
};

export default appSettingsReducer;