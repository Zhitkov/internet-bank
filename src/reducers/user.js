"use strict";

import {
    REQUEST_USER_LOGIN,
    REQUEST_USER_LOGOUT,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    LOGIN_USER_NEED_PASSWORD_CHANGE,
    CHECK_USER_AUTH_REQUEST,
    CHECK_USER_AUTH_SUCCESS,
    CHECK_USER_AUTH_ERROR,
    PASSWORD_CHANGE_REQUEST,
    PASSWORD_CHANGE_SUCCESS,
    PASSWORD_CHANGE_ERROR
} from './../actions/user.js';

const defaultUser = {
    isAuthenticating: false,
    isAuthenticated: false,
    isError: false,
    isNeedPasswordChange: false,
    profile: {},
    authError: '',
    isNeedMessage: false,
    message: '',
    passwordChangeData: {
        isRequesting: false,
        isError: false,
        isSuccess: false,
        passwordChangeError: ''
    }
};

const userReducer = (state = defaultUser, action = {}) => {
    switch(action.type) {
        case REQUEST_USER_LOGIN:
            return Object.assign({}, state, {
                isAuthenticating: true,
                isAuthenticated: false,
                isError: false
            });
            break;

        case REQUEST_USER_LOGOUT:
            if('message' in action) {
                if(action.hasOwnProperty('message')) {
                    return Object.assign({}, state, {
                        isAuthenticating: false,
                        isAuthenticated: false,
                        isError: false,
                        isNeedMessage: true,
                        message: action.message,
                        profile: {}
                    });
                }
            } else {
                return Object.assign({}, state, {
                    isAuthenticated: false,
                    profile: {}
                });
            }
            break;

        case LOGIN_USER_SUCCESS:
            return Object.assign({}, state, {
                isAuthenticating: false,
                isAuthenticated: true,
                isError: false,
                profile: action.user
            });
            break;

        case LOGIN_USER_ERROR:
            return Object.assign({}, state, {
                isAuthenticating: false,
                isAuthenticated: false,
                isError: true,
                profile: {},
                authError: action.error
            });
            break;

        case LOGIN_USER_NEED_PASSWORD_CHANGE:
            return Object.assign({}, state, {
                isNeedPasswordChange: true,
                profile: action.user
            });
            break;

        case CHECK_USER_AUTH_REQUEST:
            return Object.assign({}, state, {
                isAuthenticating: true,
                isAuthenticated: false,
                isError: false
            });
            break;

        case CHECK_USER_AUTH_SUCCESS:
            return Object.assign({}, state, {
                isAuthenticating: false,
                isAuthenticated: true,
                isError: false,
                profile: {
                    userId: action.userId
                }
            });

            break;

        case CHECK_USER_AUTH_ERROR:
            return Object.assign({}, state, {
                isAuthenticating: false,
                isAuthenticated: false,
                isError: false,
                profile: {},
                authError: action.error
            });
            break;

        case PASSWORD_CHANGE_REQUEST:
            return Object.assign({}, state, {
                passwordChangeData: {
                    isRequesting: true,
                    isError: false,
                    isSuccess: false,
                    passwordChangeError: ''
                }
            });
            break;

        case PASSWORD_CHANGE_SUCCESS:
            return Object.assign({}, state, {
                profile: action.user,
                passwordChangeData: {
                    isRequesting: false,
                    isError: false,
                    isSuccess: true,
                    passwordChangeError: ''
                }
            });
            break;

        case PASSWORD_CHANGE_ERROR:
            return Object.assign({}, state, {
                passwordChangeData: {
                    isRequesting: false,
                    isError: true,
                    isSuccess: false,
                    passwordChangeError: action.error
                }
            });
            break;

        default:
            return state;
            break;
    }
};

export default userReducer;