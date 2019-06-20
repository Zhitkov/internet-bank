"use strict";

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from './../components/Spinner.js';
import {
    PAGE_MESSAGE_BOX_TYPE_ERROR,
    PAGE_MESSAGE_BOX_TYPE_INFO,
    PageMessageBox
} from './../components/PageMessageBox.js';

import { loginUser } from './../actions/user.js';

import { $l, LocalizedComponent } from './../modules/LanguagesHelper.js';
import SubmitButton from '../components/forms/SubmitButton';


class LoginContainer extends LocalizedComponent {
    constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(e) {
        e.preventDefault();
        console.log('Making login 2...');
        const { dispatch } = this.props;
        const login = this.refs.inputLogin.value;
        const password = this.refs.inputPassword.value;
        dispatch(loginUser(login, password));
    }

    render() {
        const {
            isAuthenticating,
            isAuthenticated,
            isError,
            authError,
            isNeedMessage,
            message
            } = this.props;

        let isShowMessage = isError || isNeedMessage;
        let messageType = PAGE_MESSAGE_BOX_TYPE_INFO;
        let messageText = message;
        let boxHeading = '';
        if(isError) {
            messageType = PAGE_MESSAGE_BOX_TYPE_ERROR;
            messageText = authError;
            boxHeading = $l('web_login', 'auth_error');
        } else{
            if(typeof(message) == 'undefined') {
                isShowMessage = false;
            }
            if(messageText == '') {
                isShowMessage = false;
            }
        }

        return (
            <div class="ib-login-container">

                <div class="panel">
                    <div class="new-panel-heading ">
                        <div class="swf-login-logotype"></div>
                        <label class="sign_in">{$l('web_login', 'sign_in')}</label>
                    </div>
                    <div class="panel-body">
                        <form class="new-form" onSubmit={this.handleLogin}>
                            <div class="form-group">
                                <div class="new-input-group">
                                    <input placeholder={$l('web_login', 'login')} id="loginInput" class="form-control" type="text" ref="inputLogin"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="new-input-group">
                                    <input placeholder={$l('web_login', 'password')} id="passwordInput" class="form-control" type="password" ref="inputPassword"/>
                                </div>
                            </div>

                            <SubmitButton buttonLabel={$l('web_login', 'do_login')}
                                          isLoading={isAuthenticating} />

                            <PageMessageBox
                                show={isShowMessage}
                                type={messageType}
                                heading={boxHeading}
                                text={messageText}
                                />

                        </form>
                    </div>
                </div>


            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { user } = state;
    return {
        ...user,
        ...ownProps
    }
};

export default connect(mapStateToProps)(LoginContainer);
