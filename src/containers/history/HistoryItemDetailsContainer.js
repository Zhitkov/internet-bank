"use strict";

import React from 'react';
import { connect } from 'react-redux';

import { $l, LocalizedComponent } from '../../modules/LanguagesHelper.js';

import { getHistoryItemDetails } from '../../actions/history/historyItemDetailsActions';

import Spinner from '../../components/Spinner';
import {
    PAGE_MESSAGE_BOX_TYPE_ERROR,
    PageMessageBox
} from '../../components/PageMessageBox';
import HistoryItemDetails from '../../components/history/HistoryItemDetails';


class HistoryItemDetailsContainer extends LocalizedComponent {

    componentDidMount() {
        super.componentDidMount();
        this.fetchHistoryItem(this.props);
    }

    fetchHistoryItem(props) {
        const historyItemId = this.getHistoryItemId(props);
        this.props.getHistoryItemDetails(historyItemId);
    }

    getHistoryItemId(props) {
        const id = parseInt(props.params.id, 10);
        if (!isNaN(id)) {
            return id;
        }
        return null;
    }

    render() {
        const props = this.props;
        const historyItemDetailsDataState = props.historyItemDetails;
        const historyItemDetails = historyItemDetailsDataState.data;

        return <div>
            <h1>{$l('history_item_details', 'title')}</h1>

            <div className="ib-page-content-wrapper">

                <Spinner show={historyItemDetailsDataState.isRequesting}/>

                <PageMessageBox show={historyItemDetailsDataState.isError}
                                text={historyItemDetailsDataState.errorText}
                                type={PAGE_MESSAGE_BOX_TYPE_ERROR}  />

                <If condition={!historyItemDetailsDataState.isError && historyItemDetailsDataState.hasData} >
                    <HistoryItemDetails historyItemDetails={historyItemDetails} />
                </If>

            </div>
        </div>;
    }
}


const mapStateToProps = (state, ownProps) => ({
    historyItemDetails: state.historyItemDetails,
    ...ownProps
});

const mapDispatchToProps = dispatch => ({
    getHistoryItemDetails(operationId) {
        dispatch(getHistoryItemDetails(operationId));
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(HistoryItemDetailsContainer);