"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { $l, LocalizedComponent, dateFormat, timeFormat } from '../../modules/LanguagesHelper.js';
import PairGeneral from '../forms/pairs/General';


class HistoryItemDetails extends LocalizedComponent {

    render () {
        const historyItemDetails = this.props.historyItemDetails;

        const createdTime = moment(historyItemDetails.created);

        return <div className="ic-history-item-details">
            <PairGeneral name={$l('history_item_details', 'created')}
                         value={`${createdTime.format(dateFormat())} ${createdTime.format(timeFormat())}`} />

            { historyItemDetails.transaction_details
                // filter fields without value
                .filter(detailField => detailField.value)
                .map(detailField =>
                    <Choose>

                        {/* hack for payment source */}
                        <When condition={detailField.title === 'paymentSource'}>
                            <PairGeneral name={$l('history_item_details', 'paymentSource')}
                                         value={detailField.value.title} />
                            <PairGeneral name={$l('history_item_details', 'paymentSourceCurrency')}
                                         value={historyItemDetails.source_details.currency_name} />
                        </When>

                        {/* hack for currency */}
                        <When condition={detailField.title === 'currency'}>
                            <PairGeneral name={$l('history_item_details', detailField.title)}
                                         value={historyItemDetails.currency_name} />
                        </When>

                        <Otherwise>
                            <PairGeneral name={$l('history_item_details', detailField.title)}
                                         value={detailField.value} />
                        </Otherwise>
                    </Choose>
                )
            }
        </div>
    }

}


HistoryItemDetails.propTypes = {
    historyItemDetails: PropTypes.object.isRequired
};


export default HistoryItemDetails;