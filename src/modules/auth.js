"use strict";

import hacuServerApi from './api.js';

import {
    API_ERROR_GENERAL,
    API_ERROR_SESSION
} from './../constants.js';

const api = hacuServerApi();
const storage = window.localStorage;

const hacuAdminAuth = () => {
    const _logout = () => {
        return new Promise((resolve, reject) => {
            storage.removeItem('hacuUserIsAuth');
            storage.removeItem('hacuUserToken');
            storage.removeItem('hacuUserId');
            resolve();
        });
    };

    const _getSessionId = () => {
        return new Promise((resolve, reject) => {
            const isAuth = storage.getItem('hacuUserIsAuth');
            const sessionId = storage.getItem('hacuUserToken');

            if(sessionId && isAuth) {
                resolve(sessionId);
            } else {
                reject('Incorrect session data');
            }
        });
    };

    return {
        isAuthenticated: () => {
            return new Promise((resolve, reject) => {
                const token = storage.getItem('hacuUserToken');
                const login = storage.getItem('hacuUserLogin');
                const args = {
                    token: token
                };
                if(token) {
                    resolve(login);
                } else {
                    reject(`Can't read token`);
                }
            });
        },
        makeAuth: (login, pass) => {
            const args = {
                login: login,
                password: pass,
                appId: 'hacuDEV'
            };
            // Process API-level promise with local Auth logic
            return new Promise((resolve, reject) => {
                api.call('web.auth.auth', args)
                    .then((userApiObject) => {
                        storage.setItem('hacuUserIsAuth', true);
                        storage.setItem('hacuUserLogin', login);
                        storage.setItem('hacuUserToken', userApiObject.sessionId);
                        resolve(userApiObject);
                    })
                    .catch((error) => {
                        storage.removeItem('hacuUserIsAuth');
                        storage.removeItem('hacuUserLogin');
                        storage.removeItem('hacuUserToken');
                        reject(`${error.message}`);
                    });
            });
        },
        logout: () => {
            return _logout();
        },
        authorizedCall: (action, args = {}) => {
            return new Promise((resolve, reject) => {
                _getSessionId()
                    .then((sessionId) => {
                        const apiArgs = {
                            sessionId: sessionId,
                            appId: 'hacuIB',
                            ...args
                        };

                        api.call(action, apiArgs)
                            .then((response) => {
                                resolve(response);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        getAppSettings: () => {
            return new Promise((resolve, reject) => {
                const apiArgs = {
                    appId: 'hacuDEV'
                };
                api.call('web.settings.appSettings', apiArgs)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            })
        },
        /**
         * Call an API method without user Authorization
         * @param {string} methodName Method to be called
         * @param {Object} args Arguments to pass to API
         * @param {boolean} isMockRequest If set to true Mock answer will be returned
         * @param {boolean} returnMockError If set to true API method error will be emulated
         * @param {number} emulateAnswerLatency If it's necessary to emulate a latency for call in milliseconds
         * @returns {Promise}
         */
        unAuthorizedCall: (methodName, args = {}, isMockRequest = false, returnMockError = false, emulateAnswerLatency = 0) => {
            return api.call(methodName, args, isMockRequest, returnMockError, emulateAnswerLatency);
        },
        emulateCall: (action, args, latency = 2000, isError = false) => {
            return new Promise((resolve, reject) => {
                window.setTimeout(() => {
                    if(isError) {
                        reject({
                            name: API_ERROR_GENERAL,
                            message: 'This error was emulated'
                        });
                    } else {
                        resolve(args);
                    }
                }, latency);
            });
        },
        cleanSession: () => {
            storage.setItem('hacuUserIsAuth', false);
            storage.setItem('hacuUserToken', '');
        }
    };
};

const auth = hacuAdminAuth();

export default auth;