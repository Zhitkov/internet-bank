"use strict";

import React, { Component } from 'react';
import PropTypes  from 'prop-types';
import classnames from 'classnames';

import './Icon.less';


class Icon extends Component {

    render() {
        const {
            size,
            icon,
            modificator
        } = this.props;

        return <div className={classnames(
            'icon',
            `__sz${size}`,
            icon,
            modificator
        )}>
        </div>;
    }

}

Icon.propTypes = {
    size: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    modificator: PropTypes.string
};

export default Icon;