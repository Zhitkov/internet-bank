"use strict";

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import SecondaryMenu from '../../components/menus/SecondaryMenu';
import { $l, LocalizedComponent } from './../../modules/LanguagesHelper.js';

import Spinner from '../../components/Spinner';
import {
    PAGE_MESSAGE_BOX_TYPE_ERROR,
    PageMessageBox
} from '../../components/PageMessageBox';
import PaymentServiceWizard from '../../components/pamentServices/PaymentServiceWizard';

import { createPaymentMenu } from './../payments/paymentMenu';
import { getPaymentServices } from '../../actions/payments/paymentServicesActions';
import { startPaymentService, continuePaymentService } from '../../actions/payments/paymentServiceActions';
import { getAccountsList } from '../../actions/accounts/accountsActions';
import { extractResultDataState } from '../../modules/data/dataState';


class PaymentContainer extends LocalizedComponent {

    constructor(props) {
        super(props);
        this.state = {
            currentPaymentServiceId: null
        };

        this.onStepCompleted = this.onStepCompleted.bind(this);
        this.onAfterCompletedGoOn = this.onAfterCompletedGoOn.bind(this);
    }

    componentDidMount() {
        this.props.getPaymentServices();
        this.fetchService(this.props);
        this.props.getAccounts();
    }

    componentWillReceiveProps(nextProps) {
        this.fetchService(nextProps);
    }

    onStepCompleted(values) {
        this.props.continuePaymentService(
            this.props.paymentService.data,
            values
        );
    }

    onAfterCompletedGoOn() {
        this.props.onAfterCompletedGoOn();
    }

    /**
     * @param {Object} props
     */
    fetchService(props) {
        const serviceId = this.getServiceId(props);
        if (this.state.currentPaymentServiceId !== serviceId) {
            this.setState((prevState, props) => ({
                ...prevState,
                currentPaymentServiceId: serviceId
            }));
            props.startPaymentService(serviceId);
        }
    }

    /**
     * @param {Object} props
     * @return {number|null}
     */
    getServiceId(props) {
        const id = parseInt(props.params.id, 10);
        if (!isNaN(id)) {
            return id;
        }
        return null;
    }

    render() {
        const props = this.props;

        const paymentServicesDataState = props.paymentServices;
        const paymentServiceDataState = props.paymentService;
        const accountsDataState = props.accounts;

        const {
            hasData: hasPaymentServicesData,
        } = extractResultDataState(
            paymentServiceDataState,
            accountsDataState
        );

        return (<div>
            <h1>{$l('payment_services', 'title')}</h1>

            <div className="ib-page-content-wrapper">

                <Spinner show={paymentServicesDataState.isRequesting}/>

                <PageMessageBox show={paymentServicesDataState.isError}
                                text={paymentServicesDataState.errorText}
                                type={PAGE_MESSAGE_BOX_TYPE_ERROR}  />

                <If condition={!paymentServicesDataState.isError && paymentServicesDataState.hasData} >
                    <div className="row">
                        <div className="col-sm-4">
                            <SecondaryMenu menu={createPaymentMenu(paymentServicesDataState.data, this.getServiceId(props), $l)} />
                        </div>
                        <If condition={hasPaymentServicesData}>
                            <div className="col-sm-8">
                                <PaymentServiceWizard paymentService={paymentServiceDataState.data}
                                                      accounts={accountsDataState.data}
                                                      onStepCompleted={this.onStepCompleted}
                                                      onAfterCompletedGoOn={this.onAfterCompletedGoOn}
                                                      stepInProcessing={paymentServiceDataState.isUpdating} />
                            </div>
                        </If>
                    </div>
                </If>

            </div>
        </div>)
    }

}


const mapStateToProps = (state, ownProps) => ({
    paymentServices: state.paymentServices,
    paymentService: state.paymentService,
    accounts: state.accounts,
    ...ownProps
});

const mapDispatchToProps = dispatch => ({
    getAccounts() {
        dispatch(getAccountsList());
    },

    getPaymentServices() {
        dispatch(getPaymentServices());
    },

    startPaymentService(serviceId) {
        dispatch(startPaymentService(serviceId));
    },

    continuePaymentService(paymentService, values) {
        dispatch(continuePaymentService(paymentService, values))
    },

    onAfterCompletedGoOn() {
        dispatch(push('/history'));
    }

});


export default connect(mapStateToProps, mapDispatchToProps)(PaymentContainer);