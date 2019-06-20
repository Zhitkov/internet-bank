"use strict";

import React from 'react';
import PropTypes  from 'prop-types';
import { $l, LocalizedComponent } from './../../modules/LanguagesHelper.js';
import PairGeneral from '../forms/pairs/General';


class AccountDetails extends LocalizedComponent {

    render() {
        /**
         * @type {IAccountED}
         */
        const accountDetails = this.props.accountDetails;

        return (<div className="ib-account-details">
            <h2>{ accountDetails.externalId }</h2>

            <PairGeneral name={ $l('account_details', 'currency') }
                         value={ accountDetails.currencyName }
            />

            <PairGeneral name={ $l('account_details', 'type') }
                         value={ accountDetails.type.toString() }
            />

            <PairGeneral name={ $l('account_details', 'balance') }
                         value={ accountDetails.balance.toString() }
            />

        </div>)
    }

}


AccountDetails.propTypes = {
    accountDetails: PropTypes.object.required
};


export default AccountDetails;