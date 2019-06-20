"use strict";

import React from 'react';
import PropTypes from 'prop-types';

import { $l, LocalizedComponent } from '../../modules/LanguagesHelper.js';

import PairGeneral from '../forms/pairs/General';

import './PaymentServiceWizardResult.less';


/**
 * @param {IPaymentServiceFieldBase} field
 * @return {string}
 */
function preparePairFieldValue(field) {
    if (field.type === 'paymentSource') {
        return field.content[0].label;
    }

    if (field.value == null) {
        return "";
    }

    return field.value.toString();
}


class PaymentServiceWizardResult extends LocalizedComponent {

    render() {
        const { fields, onGoOn, goOnButtonLabel } = this.props;

        return <div className="ib-payment-service-wizard-result">
            <div className="ib-payment-service-wizard-result_icon">

            </div>

            { fields.map(field =>
                <Choose>
                    <When condition={field.type==''}>
                    </When>

                    <Otherwise>
                        <PairGeneral
                            key={field.id}
                            name={field.title}
                            value={ preparePairFieldValue(field) }
                            emptyValueText={$l('general', 'pair_empty_value')}
                            />
                    </Otherwise>
                </Choose>

            )}

            <If condition={onGoOn}>
                <div className="form-group">
                    <div className="input-group">
                        <button className="btn btn-primary" onClick={onGoOn}>{goOnButtonLabel}</button>
                    </div>
                </div>
            </If>
        </div>
    }
}


PaymentServiceWizardResult.propTypes = {
    fields: PropTypes.array.isRequired,
    onGoOn: PropTypes.func,
    goOnButtonLabel: PropTypes.string
};


export default PaymentServiceWizardResult;