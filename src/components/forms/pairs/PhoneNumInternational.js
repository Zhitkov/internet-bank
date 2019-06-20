"use strict";

import React, { Component } from 'react';
import appSettingsHelper from './../../../modules/AppSettingsHelper.js';

import PairGeneral from './General.js';

class PairPhoneNumberInternational extends PairGeneral {
    renderValue() {
        const {
            value
            } = this.props;

        let returned = (
            <span>
            </span>
        );

        if(value['number'] == '' || value['number'] == null) {
            returned = super.renderEmptyValue();
        } else {
            const countries = appSettingsHelper.getDataSet('countries');
            if(Array.isArray(countries)) {
                countries.map((country) => {
                    if(country['code'] == value['prefix']) {
                        returned = (
                            <span>
                        <span class="ib-pair-phone-number-code">+{country['phoneCode']}</span>
                        <span class="ib-pair-phone-number-number">{value['number']}</span>
                    </span>
                        );
                    }
                });
            }
        }
        return returned;
    }
}

export default PairPhoneNumberInternational;

