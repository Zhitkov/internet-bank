"use strict";

import auth from './../modules/auth.js';
import { push } from 'react-router-redux';
import {
    API_ERROR_GENERAL,
    API_ERROR_SESSION
} from './../constants.js';
import {
    appSettingsLoadRequest,
    appSettingsLoadSuccess,
    appSettingsLoadFailed
} from './appSettings.js'

/*

 Login related actions

 */
export const REQUEST_USER_LOGIN = 'REQUEST_USER_LOGIN';
const requestUserLogin = () => {
    return {
        type: REQUEST_USER_LOGIN
    }
};

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
const loginUserSuccess = (user) => {
    return {
        type: LOGIN_USER_SUCCESS,
        user: user
    }
};

export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';
export const loginUserError = (error) => {
    return {
        type: LOGIN_USER_ERROR,
        error: error
    }
};

export const LOGIN_USER_NEED_PASSWORD_CHANGE = 'LOGIN_USER_NEED_PASSWORD_CHANGE';
export const loginUserNeedPasswordChange = (user) => {
    return {
        type: LOGIN_USER_NEED_PASSWORD_CHANGE,
        user: user
    }
};

export const CHECK_USER_AUTH_REQUEST = 'CHECK_USER_AUTH_REQUEST';
const checkUserAuthRequest = () => {
    return {
        type: CHECK_USER_AUTH_REQUEST
    }
};

export const CHECK_USER_AUTH_SUCCESS = 'CHECK_USER_AUTH_SUCCESS';
const checkUserAuthSuccess = (userId) => {
    return {
        type: CHECK_USER_AUTH_SUCCESS,
        userId: userId
    }
};

export const CHECK_USER_AUTH_ERROR = 'CHECK_USER_AUTH_ERROR';
const checkUserAuthError = (error) => {
    return {
        type: CHECK_USER_AUTH_ERROR,
        error: error
    }
};

// Password change routine
export const PASSWORD_CHANGE_REQUEST = 'PASSWORD_CHANGE_REQUEST';
export const passwordChangeRequest = () => {
    return {
        type: PASSWORD_CHANGE_REQUEST,
    }
};

export const PASSWORD_CHANGE_SUCCESS = 'PASSWORD_CHANGE_SUCCESS';
export const passwordChangeSuccess = (user) => {
    return {
        type: PASSWORD_CHANGE_SUCCESS,
        user: user
    }
};

export const PASSWORD_CHANGE_ERROR = 'PASSWORD_CHANGE_ERROR';
export const passwordChangeError = (error) => {
    return {
        type: PASSWORD_CHANGE_ERROR,
        error: error
    }
};

export const passwordChange = (newPassword) => {
    return (dispatch) => {
        dispatch(passwordChangeRequest());
        return auth.authorizedCall('web.register.changePassword', {
            password: newPassword
        })
            .then((user) => {
                dispatch(passwordChangeSuccess(user));
                dispatch(userLogout('Please login using your new password'));
            })
            .catch((error) => {
                processApiError(error, dispatch, () => {
                    dispatch(passwordChangeError(error.message));
                });
            });
    }
};

export const loginUser = (login, pass) => {
    return (dispatch) => {
        dispatch(appSettingsLoadRequest());
        return auth.getAppSettings()
            .then((appSettings) => {
                dispatch(appSettingsLoadSuccess(appSettings));
                dispatch(requestUserLogin());
                auth.makeAuth(login, pass)
                    .then((user) => {
                        if(user['needChangePassword'] == true) {
                            dispatch(loginUserNeedPasswordChange(user));
                            dispatch(push('/change-password'));
                        } else {
                            dispatch(loginUserSuccess(user));
                            dispatch(push('/'));
                        }
                    })
                    .catch((error) => {
                        dispatch(loginUserError(error));
                    });
            })
            .catch((error) => {
                dispatch(appSettingsLoadFailed(error));
                dispatch(requestUserLogin());
                auth.makeAuth(login, pass)
                    .then((user) => {
                        if(user['needChangePassword'] == true) {
                            dispatch(loginUserNeedPasswordChange(user));
                            dispatch(push('/change-password'));
                        } else {
                            dispatch(loginUserSuccess(user));
                            dispatch(push('/'));
                        }
                    })
                    .catch((error) => {
                        dispatch(loginUserError(error));
                    });
            });
    };
};

export const checkUserAuth = () => {
    return (dispatch) => {
        dispatch(appSettingsLoadRequest());
        return auth.getAppSettings()
            .then((appSettings) => {
                dispatch(appSettingsLoadSuccess(appSettings));
                dispatch(checkUserAuthRequest());
                auth.isAuthenticated()
                    .then((userId) => {
                        dispatch(checkUserAuthSuccess(userId));
                    })
                    .catch((error) => {
                        dispatch(checkUserAuthError(error));
                        dispatch(push('/login'));
                    });
            })
            .catch((error) => {
                dispatch(appSettingsLoadFailed(error));
                dispatch(checkUserAuthRequest());
                auth.isAuthenticated()
                    .then((userId) => {
                        dispatch(checkUserAuthSuccess(userId));
                    })
                    .catch((error) => {
                        dispatch(checkUserAuthError(error));
                        dispatch(push('/login'));
                    });
            });
    };
};

export const processApiError = (error, dispatch, customCallBack) => {
    console.log('Trying to deal with error:');
    console.log(error);
    if(error.name == API_ERROR_SESSION) {
        auth.cleanSession();
        dispatch(loginUserError('Session ends'));
        dispatch(push('/login'));
    } else {
        customCallBack();
    }
};

export const REQUEST_USER_LOGOUT = 'REQUEST_USER_LOGOUT';
const requestUserLogout = (message) => {
    return {
        type: REQUEST_USER_LOGOUT,
        message: message
    }
};

export const userLogout = (message) => {
    return (dispatch) => {
        return auth.logout()
            .then(() => {
                dispatch(requestUserLogout(message));
                dispatch(push('/login'));
            });
    };
};
