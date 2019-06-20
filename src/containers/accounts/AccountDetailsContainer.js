"use strict";

import React from 'react';
import { connect } from 'react-redux';
import { $l, LocalizedComponent } from './../../modules/LanguagesHelper.js';

import { getAccountDetailsAction } from '../../actions/accounts/accountDetailsActions';

import AccountDetails from '../../components/accounts/AccountDetails';
import Spinner from '../../components/Spinner';
import {
    PAGE_MESSAGE_BOX_TYPE_ERROR,
    PageMessageBox
} from '../../components/PageMessageBox';


class AccountDetailsContainer extends LocalizedComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getAccountDetails({
            externalId: this.props.params.externalId
        });
    }

    render() {
        const accountDetailsState = this.props.accountDetailsState;

        const {
            isRequesting,
            isError,
            errorText,
            hasData
            } = accountDetailsState;

        const accountDetails = accountDetailsState.data;

        return (<div>
            <h1>{$l('web_account_details_page', 'title')}</h1>

            <div className="ib-page-content-wrapper">

                <Spinner show={isRequesting}/>

                <PageMessageBox show={isError}
                                text={errorText}
                                type={PAGE_MESSAGE_BOX_TYPE_ERROR}  />

                <If condition={!isError && hasData} >
                    <div className="row">
                        <div className="col-md-6">
                            <AccountDetails accountDetails={accountDetails} />
                        </div>
                    </div>
                </If>

            </div>
        </div>)
    }
}


const mapStateToProps = (state, ownProps) => ({
    accountDetailsState: state.accountDetails,
    ...ownProps
});

const mapDispatchToProps = dispatch => ({
    /**
     * @param {IAccountSelector} accountSelector
     */
    getAccountDetails: function(accountSelector) {
        dispatch(getAccountDetailsAction(accountSelector));
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(AccountDetailsContainer);