"use strict";

import React, { Component } from 'react';

import appSettingsHelper from './../../../modules/AppSettingsHelper.js'

class PhoneCountryCodeField extends Component {
    render() {
        const {
            input,
            label,
            meta
            } = this.props;
        let countriesDataSet = appSettingsHelper.getDataSet('countries');
        if(countriesDataSet == null) {
            countriesDataSet = [];
        }

        let index = 0;

        return(
            <select
                {...input}
                >
                { countriesDataSet.map((country) => {
                    index++;
                    return(
                        <option
                            key={index}
                            value={country.code}
                            >{`${country.name} (+${country.phoneCode})`}</option>
                    )
                }) }

            </select>
        )
    }
}

export default PhoneCountryCodeField;