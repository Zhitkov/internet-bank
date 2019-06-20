"use strict";

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { $l, LocalizedComponent } from './../../modules/LanguagesHelper.js';
import appSettingsHelper from './../../modules/AppSettingsHelper.js';
import { getCountryPhonePrefixByCode } from './../../modules/Utils.js';

import Spinner from './../../components/Spinner.js';
import InlineError from './../../components/InlineError.js';
import RegistrationForm from './../../components/forms/Registration.js';

import { userRegister } from './../../actions/registration.js';


class RegistrationContainer extends LocalizedComponent {
    constructor(props) {
        super(props);

        this.handleSubmitButton = this.handleSubmitButton.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleFinishButton = this.handleFinishButton.bind(this);
    }

    handleSubmitButton(e) {
        e.preventDefault();
        this.refs.registerForm.submit();
    }

    handleFormSubmit(formContent) {
        const countries = appSettingsHelper.getDataSet('countries'),
            phonePrefix = getCountryPhonePrefixByCode(countries, formContent['phonePrefix']);


        this.props.userRegister({
            primaryPhone: '+' + phonePrefix + formContent['primaryPhoneNumber'],
            firstName: formContent['firstName'],
            lastName: formContent['lastName'],
            additionalData: {
                phoneCountry: formContent['phonePrefix'],
                phoneNumber: formContent['primaryPhoneNumber'],
                userResidence: formContent['userResidence'],
                companyName: formContent['companyName'],
                companyResidence: formContent['companyResidence'],
                typeOfBusiness: formContent['typeOfBusiness']
            }
        });
    }

    handleFinishButton(e) {
        e.preventDefault();
        this.props.finishRegistration();
    }

    render() {
        const {
            hasData,
            isRequesting,
            isError,
            errorText,
            } = this.props;

        const errorMessage = $l('web_errors', errorText);

        return(
            <div>
                <div class="row">
                    <div class="col-md-2"></div>
                    <div class="col-md-8">
                        <Spinner
                            show={isRequesting}
                            />
                        <div class="panel panel-default">
                            <div class="panel-heading">{$l('web_registration', 'title')}</div>
                            <div class="panel-body">
                                <Choose>
                                    <When condition={hasData}>
                                        <div class="ib-payment-service-wizard-result">
                                            <div class="ib-payment-service-wizard-result_icon"></div>
                                            <div>
                                                <p>{$l('web_registration', 'complete_text')}</p>
                                                <button class="btn btn-primary" onClick={this.handleFinishButton}>{$l('web_registration', 'finish')}</button>
                                            </div>
                                        </div>
                                    </When>
                                    <Otherwise>
                                        <p>{$l('web_registration', 'description')}</p>
                                        <RegistrationForm
                                            ref="registerForm"
                                            onSubmit={this.handleFormSubmit}
                                            />
                                        <button class="btn btn-primary" onClick={this.handleSubmitButton}>{$l('web_registration', 'register')}</button>
                                        <InlineError
                                            title={$l('web_registration', 'error')}
                                            text={errorMessage}
                                            show={isError}
                                            />
                                    </Otherwise>
                                </Choose>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2"></div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const registration = state['registration'];
    return {
        ...registration,
        ...ownProps
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        userRegister: (data) => {
            dispatch(userRegister(data));
        },
        finishRegistration: () => {
            dispatch(push('/login'));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer);