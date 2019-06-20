"use strict";

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LanguagesSwitcherItem extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    getCode() {
        return this.props.code;
    }

    getClassName() {
        const {
            activeItem
            } = this.props;

        let className = 'languages-switcher-item';
        if(activeItem == this.getCode()) {
            className += ' languages-switcher-item-active';
        }
        return className;
    }

    handleClick(e) {
        e.preventDefault();
        this.props.onSelect(this.getCode());
    }

    render() {
        const {
            code,
            shortName
            } = this.props;

        return(
            <li
                class={this.getClassName()}
                key={code}
                onClick={this.handleClick}
                >{shortName}</li>
        )
    }
}

LanguagesSwitcherItem.propTypes = {
    code: PropTypes.string,
    shortName: PropTypes.string,
    activeItem: PropTypes.string,
    onSelect: PropTypes.func
};

LanguagesSwitcherItem.defaultProps = {
    code: '',
    shortName: '',
    activeItem: '',
    onSelect: () => {}
};

export default LanguagesSwitcherItem;