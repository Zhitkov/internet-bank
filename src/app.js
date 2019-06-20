"use strict";

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import configureStore from './configureStore.js';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';

import languagesHelper from './modules/LanguagesHelper.js';
import appSettingsHelper from './modules/AppSettingsHelper.js';

import GeneralContainer from './containers/GeneralContainer.js';
import LoginContainer from './containers/LoginContainer.js';
import RegistrationContainer from './containers/registration/RegistrationContainer.js';
import AccountsContainer from './containers/accounts/AccountsContainer.js';
import HistoryContainer from './containers/history/HistoryContainer.js';
import HistoryItemDetailsContainer from './containers/history/HistoryItemDetailsContainer.js';
import ProfileContainer from './containers/ProfileContainer.js';
import ChangePasswordContainer from './containers/ChangePasswordContainer.js';
import AccountDetailsContainer from './containers/accounts/AccountDetailsContainer';
import PaymentContainer from './containers/payments/PaymentContainer';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

// Subscribe to store changes to always get actual languages
languagesHelper.init(store);
store.subscribe(languagesHelper.handleStoreChange);

appSettingsHelper.init(store);
store.subscribe(appSettingsHelper.handleStoreChange);

const app = document.getElementById('app');

ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <Router history={history}>
                <Route path="/" component={GeneralContainer}>
                    <IndexRoute component={AccountsContainer} />
                    <Route path="accounts">
                        <IndexRoute component={AccountsContainer} />
                        <Route path=":externalId" component={AccountDetailsContainer} />
                    </Route>
                    <Route path="change-password" component={ChangePasswordContainer} />
                    <Route path="history">
                        <IndexRoute component={HistoryContainer} />
                        <Route path="payments/:id" component={PaymentContainer} />
                        <Route path="details/:id" component={HistoryItemDetailsContainer} />
                    </Route>
                    <Route path="profile" component={ProfileContainer} />
                    <Route path="login" component={LoginContainer} />
                    <Route path="registration" component={RegistrationContainer} />
                </Route>
            </Router>
        </Provider>
    </AppContainer>,
    app
);