"use strict";
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formsReducer } from 'redux-form';

import userReducer from './user.js';
import registrationReducer from './registration.js';

import accountsReducer from './accounts/accountsReducer';
import accountDetailsReducer from './accounts/accountDetailsReducer';

import appSettingsReducers from './appSettings.js';
import profileReducer from './profile.js';

import paymentServicesReducer from './payments/paymentServicesReducer';
import paymentServiceReducer from './payments/paymentServiceReducer';

import historyListReducer from './history/historyListReducer';
import historyItemDetailsReducer from './history/historyItemDetailsReducer';


const rootReducer = combineReducers({
    appSettings: appSettingsReducers,
    user: userReducer,
    accounts: accountsReducer,
    accountDetails: accountDetailsReducer,
    profile: profileReducer,
    routing: routerReducer,
    form: formsReducer,
    paymentServices: paymentServicesReducer,
    paymentService: paymentServiceReducer,
    historyList: historyListReducer,
    historyItemDetails: historyItemDetailsReducer,
    registration: registrationReducer
});

export default rootReducer;