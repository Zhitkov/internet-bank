"use strict";

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    $l,
    LocalizedComponent
} from './../../../modules/LanguagesHelper.js';

class PairGeneral extends LocalizedComponent {
    renderEmptyValue() {
        const {
            emptyValueText
            } = this.props;

        return(
            <span class="ib-pair-empty-value">{emptyValueText}</span>
        )
    }

    renderValue() {
        const {
            value
            } = this.props;

        if (value == null || value === '') {
            return this.renderEmptyValue();
        }

        return (
            <span>{value}</span>
        );
    }

    renderName() {
        const {
            name
            } = this.props;
        return name;
    }

    render() {
        return(
            <div class="ib-pair-general-container">
                <div class="ib-pair-general-name">{this.renderName()}</div>
                <div class="ib-pair-general-value">{this.renderValue()}</div>
            </div>
        )
    }
}

PairGeneral.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    emptyValueText: PropTypes.string
};

PairGeneral.defaultProps = {
    name: '',
    value: '',
    emptyValueText: $l('general', 'pair_empty_value')
};

export default PairGeneral;

