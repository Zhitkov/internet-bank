"use strict";

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import languagesHelper, { LocalizedComponent } from './../../modules/LanguagesHelper.js';
import {
    activeLocalizationChange
} from './../../actions/appSettings.js';

import './../../styles/components/LanguagesSwitcher.less';

import LanguagesSwitcherItem from './LanguagesSwitcherItem.js';

class LanguagesSwitcher extends LocalizedComponent {
    constructor(props) {
        super(props);

        this.handleItemSelect = this.handleItemSelect.bind(this);
    }

    handleItemSelect(code) {
        this.props.activeLocalizationChange(code);
    }

    render() {
        let availableLocalizations = languagesHelper.getAvailableLocalizations();

        if(typeof availableLocalizations == 'undefined') {
            availableLocalizations = [];
        }

        return(
            <ul class="languages-switcher-container aspro-languages-switcher-container">
                { availableLocalizations.map((localization) => {
                    return(
                        <LanguagesSwitcherItem
                            code={localization['code']}
                            shortName={localization['shortName']}
                            onSelect={this.handleItemSelect}
                            activeItem={languagesHelper.getActiveLocalization()}
                            />
                    )
                }) }
            </ul>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        activeLocalizationChange: (newLocalization) => {
            dispatch(activeLocalizationChange(newLocalization));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguagesSwitcher);