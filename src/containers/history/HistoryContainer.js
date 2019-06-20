"use strict";

import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { $l, LocalizedComponent } from '../../modules/LanguagesHelper.js';
import SecondaryMenu from '../../components/menus/SecondaryMenu';
import {
    ENTITY_TABLE_CELL_TYPE_TEXT,
    ENTITY_TABLE_CELL_TYPE_TEXT_ICON,
    ENTITY_TABLE_CELL_TYPE_LINK,
    EntityTableView
} from '../../components/EntityTableView.js';
import Spinner from '../../components/Spinner';
import {
    PAGE_MESSAGE_BOX_TYPE_ERROR,
    PageMessageBox
} from '../../components/PageMessageBox';

import { createPaymentMenu } from '../payments/paymentMenu';
import { getPaymentServices } from '../../actions/payments/paymentServicesActions';
import { getHistoryList } from '../../actions/history/actions.js'


const transferTypesWithIcon = new Set([
    'reverse',
    'complete',
    'incoming',
    'block'
]);

class HistoryContainer extends LocalizedComponent {

    componentDidMount() {
        super.componentDidMount();
        this.props.getPaymentServices();
        this.props.getHistoryList(moment().subtract(1, 'months'), moment().add(1, 'days'));
    }

    render() {
        const paymentServicesState = this.props.paymentServices;
        const historyListState = this.props.historyList;

        const paymentServices = paymentServicesState.data;

        const historyListData = historyListState.data;


        const tableHeaders = [
            $l('general', 'date'),
            $l('general', 'time'),
            $l('general', 'type'),
            $l('general', 'currency'),
            $l('general', 'amount')
        ];
        let tableItems = [],
            newTableItem = [];
        historyListData.map(historyItem => {
            newTableItem = [];
            newTableItem.push({
                type: ENTITY_TABLE_CELL_TYPE_LINK,
                value: historyItem.date,
                href: `/history/details/${historyItem.id}`
            });
            newTableItem.push({
                type: ENTITY_TABLE_CELL_TYPE_TEXT,
                value: historyItem.time
            });

            if (transferTypesWithIcon.has(historyItem.type)) {
                newTableItem.push({
                    type: ENTITY_TABLE_CELL_TYPE_TEXT_ICON,
                    icon: 'icon_history_' + historyItem.type,
                    value: $l('history', 'item_type_' + historyItem.type)
                });
            } else {
                newTableItem.push({
                    type: ENTITY_TABLE_CELL_TYPE_TEXT_ICON,
                    value: $l('history', 'item_type_' + historyItem.type)
                });
            }

            newTableItem.push({
                type: ENTITY_TABLE_CELL_TYPE_TEXT,
                value: historyItem.currency
            });
            newTableItem.push({
                type: ENTITY_TABLE_CELL_TYPE_TEXT,
                value: historyItem.amount
            });
            tableItems.push(newTableItem);
        });

        const isRequesting = paymentServicesState.isRequesting || historyListState.isRequesting;
        const isError = paymentServicesState.isError || historyListState.isError;
        let errorMessage = '';
        if(isError) {
            errorMessage = paymentServicesState.isError ? paymentServicesState.errorMessage : historyListState.errorMessage;
        }

        return (<div>
                <h1>{$l('web_history', 'title')}</h1>

                <div className="ib-page-content-wrapper">

                    <Spinner show={isRequesting}/>

                    <PageMessageBox show={isError}
                                    text={errorMessage}
                                    type={PAGE_MESSAGE_BOX_TYPE_ERROR}  />


                        <div className="row">
                            <div className="col-sm-4">
                                <If condition={!paymentServicesState.isError && paymentServicesState.hasData}>
                                    <SecondaryMenu menu={createPaymentMenu(paymentServices, null, $l)} />
                                </If>
                            </div>
                            <div className="col-sm-8">
                                <EntityTableView headers={tableHeaders}
                                                 items={tableItems}
                                                 dataIsLoading={historyListState.isRequesting}
                                                 emptyText={$l('web_history', 'empty_list')} />
                            </div>
                        </div>


                </div>
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => ({
    paymentServices: state.paymentServices,
    historyList: state.historyList,
    ...ownProps
});

const mapDispatchToProps = dispatch => ({
    getPaymentServices() {
        dispatch(getPaymentServices());
    },
    getHistoryList(fromDate, toDate) {
        dispatch(getHistoryList(fromDate, toDate));
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(HistoryContainer);