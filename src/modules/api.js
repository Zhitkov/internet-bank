"use strict";

import axios from 'axios';
import {
    API_ENDPOINT,
    API_ERROR_SESSION,
    API_ERROR_GENERAL
} from './../constants.js';

import {
    getMockAnswer
} from './mocks.js';

const hacuServerApi = () => {
    return {
        call: (action, args, isMockRequest = false, returnMockError = false, emulateAnswerLatency = 0) => {
            return new Promise((resolve, reject) => {
                if(isMockRequest) {
                    window.setTimeout(() => {
                        if(returnMockError) {
                            reject(getMockAnswer(action, returnMockError));
                        } else {
                            resolve(getMockAnswer(action, returnMockError));
                        }
                    }, emulateAnswerLatency);
                } else {
                    axios.post(API_ENDPOINT, {
                        action: action,
                        args: args
                    })
                        .then((response) => {
                            if (response.status == 200) {
                                if (response.data.status == 1) {
                                    resolve(response.data.data);
                                } else {
                                    if (response.data.code == 218) {
                                        // Problems with session
                                        reject({
                                            name: API_ERROR_SESSION,
                                            message: ''
                                        });
                                    } else {
                                        // Other error
                                        reject({
                                            name: API_ERROR_GENERAL,
                                            message: `${response.data.message}`
                                        });
                                    }
                                }
                            } else {
                                reject({
                                    name: API_ERROR_GENERAL,
                                    message: response.statusText
                                });
                            }
                        })
                        .catch((error) => {
                            reject({
                                name: API_ERROR_GENERAL,
                                message: error
                            });
                        });
                }
            });
        }
    }
};

export default hacuServerApi;