"use strict";

import React, { Component } from 'react';
import PropTypes  from 'prop-types';
import { connect } from 'react-redux';

import { $l, LocalizedComponent } from './../modules/LanguagesHelper.js';

import Spinner from './../components/Spinner.js';
import ChangePasswordForm from './../components/forms/ChangePassword.js';

import {
    passwordChange,
    passwordChangeError
} from './../actions/user.js';

class ChangePasswordContainer extends LocalizedComponent {
    constructor(props) {
        super(props);

        this.handleSubmitButton = this.handleSubmitButton.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleSubmitButton(e) {
        e.preventDefault();
        this.refs.passwordChangeForm.submit();
    }

    handlePasswordChange(formContent) {
        const firstPassword = formContent['firstNewPassword'],
            secondPassword = formContent['secondNewPassword'];
        if(firstPassword != secondPassword) {
            this.props.passwordChangeError($l('web_change_password', 'error_passwords_dosent_match'));
        } else {
            this.props.passwordChange(firstPassword, $l('web_change_password', 'login_using_new_password'));
        }
    }

    render() {
        console.log(this.props.passwordChangeData);

        const {
            isRequesting,
            isError,
            passwordChangeError
            } = this.props.passwordChangeData;

        return(
            <div>
                <Spinner
                    show={isRequesting}
                    />
                <h1>{$l('web_change_password', 'title')}</h1>
                <p>{$l('web_change_password', 'description')}</p>
                <ChangePasswordForm
                    ref="passwordChangeForm"
                    onSubmit={this.handlePasswordChange}
                    />
                <button class="btn btn-primary" onClick={this.handleSubmitButton}>{$l('web_change_password', 'change_button')}</button>
                { isError ?
                    <div class="ib-form-error-container ib-block-margin">
                        <div class="panel panel-danger">
                            <div class="panel-heading">{$l('web_change_password', 'error_title')}</div>
                            <div class="panel-body">{passwordChangeError}</div>
                        </div>
                    </div> : <div></div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { passwordChangeData } = state.user;
    return {
        passwordChangeData: passwordChangeData,
        ...ownProps
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        passwordChange: function(newPassword) {
            dispatch(passwordChange(newPassword));
        },
        passwordChangeError: function(errorText) {
            dispatch(passwordChangeError(errorText))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordContainer);