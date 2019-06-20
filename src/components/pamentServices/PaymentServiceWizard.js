"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { $l, LocalizedComponent } from './../../modules/LanguagesHelper.js';

import preparePaymentServiceForDynamicForm from './preparePaymentServiceForDynamicForm';
import DynamicForm from '../forms/DynamicForm';
import PaymentServiceWizardResult from './PaymentServiceWizardResult';

const PaymentServiceWizardForm = reduxForm({
    form: 'paymentServiceFormWizard'
})(DynamicForm);


class PaymentServiceWizard extends LocalizedComponent {

    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onAfterCompletedGoOn = this.onAfterCompletedGoOn.bind(this);
    }

    /**
     * @param {IPaymentServiceED} paymentService
     */
    getTitleKey(paymentService) {
        return paymentService.steps[paymentService.currentStepIndex - 1];
    }

    onFormSubmit(values) {
        // TODO: [dmitry.makhnev] validation
        this.props.onStepCompleted(values);
    }

    onAfterCompletedGoOn() {
        this.props.onAfterCompletedGoOn();
    }

    render() {
        /**
         * @type {IPaymentServiceED}
         * */
        const paymentService = this.props.paymentService;
        /**
         * @type {Array.<IAccountED>}
         * */
        const accounts = this.props.accounts;

        const stepInProcessing = this.props.stepInProcessing || false;

        // TODO: [dmitry.makhnev] think about cache
        const paymentServiceWizardFormData = preparePaymentServiceForDynamicForm(paymentService, accounts, $l);
        const isResultStep = paymentService.currentStepIndex === paymentService.steps.length;

        return <div className="ib-payment-service-wizard">
            <h3 className="ib-payment-service-wizard_title">
                {$l('payment-service', this.getTitleKey(paymentService))}
            </h3>

            <If condition={paymentService.errors.length}>
                {paymentService.errors.map(error =>
                    <div className="alert alert-danger" key={error.message}>{$l('payment-service-wizard', error.message)}</div>
                )}
            </If>

            <If condition={isResultStep}>
                <PaymentServiceWizardResult fields={paymentServiceWizardFormData.fields}
                                            onGoOn={this.onAfterCompletedGoOn}
                                            goOnButtonLabel={$l('payment-service-wizard', 'result-go-on-label')}  />
            </If>

            <If condition={!isResultStep}>
                <PaymentServiceWizardForm fields={paymentServiceWizardFormData.fields}
                                          onSubmit={this.onFormSubmit}
                                          initialValues={paymentServiceWizardFormData.initialValues}
                                          submitLabel={$l('payment-service-wizard', 'submit')}
                                          isLoading={stepInProcessing} />
            </If>
        </div>
    }
}


PaymentServiceWizard.propTypes = {
    paymentService: PropTypes.object.isRequired,
    accounts: PropTypes.array.isRequired,
    onStepCompleted: PropTypes.func.isRequired,
    onAfterCompletedGoOn: PropTypes.func.isRequired,
    stepInProcessing: PropTypes.bool
};

export default PaymentServiceWizard;