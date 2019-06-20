"use strict";

import {
    convertApiNameToCamelCase
} from './../modules/Utils.js';

const answers = {
    webAuthRegister: {
        positive: {
            data: {
                ok: 'ok'
            }
        },
        negative: {
            name: 'Error',
            message: 'Mock error'
        }
    },
    testRequestSent: {
        positive: {
            data: {
                ok: 'ok'
            }
        },
        negative: {
            name: 'Error',
            message: 'Error message'
        }
    }
};

export const getMockAnswer = (methodName, isNeedNegative = false) => {
    let returned = {};
    let answer = {};
    const mockName = convertApiNameToCamelCase(methodName);
    if(answers.hasOwnProperty(mockName)) {
        answer = answers[mockName];
        if(isNeedNegative) {
            if(answer.hasOwnProperty('negative')) {
                returned = answer['negative'];
            } else {
                returned = {
                    name: 'Emulated',
                    message: 'This error was emulated'
                };
            }
        } else {
            if(answer.hasOwnProperty('positive')) {
                returned = answer['positive'];
            } else {
                returned = {
                    data: {
                        ok: 'ok'
                    }
                }
            }
        }
    } else {
        if(isNeedNegative) {
            returned = {
                name: 'Emulated',
                message: 'This error was emulated'
            }
        } else {
            returned = {
                data: {
                    ok: 'ok'
                }
            };
        }
    }
    return returned;
};