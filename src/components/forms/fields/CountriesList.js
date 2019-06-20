"use strict";

import React, { Component } from 'react';

import appSettingsHelper from './../../../modules/AppSettingsHelper.js'

class CountriesListField extends Component {
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
            <div class="form-group">
                <label>{label}</label>
                <select
                    {...input}
                    class="form-control"
                    >
                    { countriesDataSet.map((country) => {
                        index++;
                        return(
                            <option
                                key={index}
                                value={country.code}
                                >{`${country.name} (${country.code})`}</option>
                        )
                    }) }

                </select>
            </div>
        )
    }
}

export default CountriesListField;

