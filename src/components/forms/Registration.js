"use strict";

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import InputTextField from './../forms/fields/InputTextField.js'
import PhoneCountryCodeField from './../forms/fields/PhoneCountryCode.js';
import CountriesListField from './../forms/fields/CountriesList.js';
import {
    $l,
    LocalizedComponent
} from './../../modules/LanguagesHelper.js';

class RegistrationForm extends LocalizedComponent {
    render() {
        const { onSubmit } = this.props;

        return(
            <form class="password-change-form" onSubmit={onSubmit}>
                <div class="form-group">
                    <label>{$l('web_registration', 'phone_number')}</label>
                    <div class="input-group">
                        <div class="input-group-addon">
                            <Field
                                name="phonePrefix"
                                component={PhoneCountryCodeField}
                                />
                        </div>
                        <Field
                            name="primaryPhoneNumber"
                            class="form-control"
                            component="input"
                            type="text"
                            />
                    </div>
                </div>

                <Field
                    name="firstName"
                    component={InputTextField}
                    label={$l('web_registration', 'first_name')}
                    />
                <Field
                    name="lastName"
                    component={InputTextField}
                    label={$l('web_registration', 'last_name')}
                    />
                <Field
                    name="userResidence"
                    component={CountriesListField}
                    label={$l('web_registration', 'user_residence')}
                    />
                <Field
                    name="companyName"
                    component={InputTextField}
                    label={$l('web_registration', 'company_name')}
                    />
                <Field
                    name="companyResidence"
                    component={CountriesListField}
                    label={$l('web_registration', 'company_residence')}
                    />
                <Field
                    name="typeOfBusiness"
                    component={InputTextField}
                    label={$l('web_registration', 'type_of_business')}
                    />
            </form>
        )
    }
}

RegistrationForm.propTypes = {
    onSubmit: PropTypes.func
};

RegistrationForm.propTypes = {
    onSubmit: () => {}
};

RegistrationForm = reduxForm({
    form: 'registrationForm'
})(RegistrationForm);

export default RegistrationForm;