"use strict";

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import {
    $l,
    LocalizedComponent
} from './../../modules/LanguagesHelper.js';

class ChangePasswordForm extends LocalizedComponent {
    render() {
        const { onSubmit } = this.props;

        return(
            <form class="password-change-form" onSubmit={onSubmit}>
                <div class="form-group">
                    <div class="input-group">
                        <span class="input-group-addon">{$l('web_change_password', 'new_password')}</span>
                        <Field
                            name="firstNewPassword"
                            class="form-control"
                            component="input"
                            type="password"
                            />
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <span class="input-group-addon">{$l('web_change_password', 'repeat_password')}</span>
                        <Field
                            name="secondNewPassword"
                            class="form-control"
                            component="input"
                            type="password"
                            />
                    </div>
                </div>
            </form>
        )
    }
}

ChangePasswordForm.propTypes = {
    onSubmit: PropTypes.func
};

ChangePasswordForm.defaultProps = {
    onSubmit: () => {}
};

ChangePasswordForm = reduxForm({
    form: 'changePasswordForm'
})(ChangePasswordForm);

export default ChangePasswordForm;