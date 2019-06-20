"use strict";

import React from 'react';
import { connect } from 'react-redux';

import { $l, LocalizedComponent } from './../../modules/LanguagesHelper.js';

import {
    ENTITY_TABLE_CELL_TYPE_TEXT,
    ENTITY_TABLE_CELL_TYPE_LINK,
    EntityTableView
} from './../../components/EntityTableView';
import Spinner from '../../components/Spinner';
import {
    PAGE_MESSAGE_BOX_TYPE_ERROR,
    PageMessageBox
} from '../../components/PageMessageBox';

import {
    getAccountsList
} from '../../actions/accounts/accountsActions.js';


class AccountsContainer extends LocalizedComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getAccountsList();
    }

    render() {
        const accountsState = this.props.accounts;
        const {
            isRequesting,
            isError,
            errorText,
            hasData
            } = accountsState;
        const accounts = accountsState.data;

        const tableHeaders = [
            $l('web_accounts', 'IBAN'),
            $l('general', 'currency'),
            $l('web_accounts', 'balance')
        ];

        const tableItems = accounts.map(
            /**
             * @param {IAccountED} account
             * @return {Array}
             */
            account => [
                {
                    type: ENTITY_TABLE_CELL_TYPE_LINK,
                    value: account.externalId,
                    href: `/accounts/${account.externalId}`
                },
                {
                    type: ENTITY_TABLE_CELL_TYPE_TEXT,
                    value: account.currencyName
                },
                {
                    type: ENTITY_TABLE_CELL_TYPE_TEXT,
                    value: account.balance
                }
            ]
        );

        return(
            <div>
                <h1>{$l('web_accounts', 'title')}</h1>

                <div className="ib-page-content-wrapper">

                    <Spinner show={isRequesting}/>

                    <PageMessageBox show={isError}
                                text={errorText}
                                type={PAGE_MESSAGE_BOX_TYPE_ERROR}  />

                    <If condition={!isError && hasData} >
                        <EntityTableView
                            headers={tableHeaders}
                            items={tableItems}
                            dataIsLoading={isRequesting}
                            emptyText={$l('web_accounts', 'empty_accounts_list')}
                            />
                    </If>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => ({
    accounts: state.accounts,
    ...ownProps
});

const mapDispatchToProps = dispatch => ({
    getAccountsList() {
        dispatch(getAccountsList());
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(AccountsContainer);