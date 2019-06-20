"use strict";

import React, { Component } from 'react';
import PropTypes  from 'prop-types';

import "./Spinner.less";

const Spinner = ({show}) => {
    if(show) {
        return(
            <div class="spinner-box-container">
                <div class="spinner">
                    <div class="bounce1"></div>
                    <div class="bounce2"></div>
                    <div class="bounce3"></div>
                </div>
            </div>
        );
    } else {
        return(
            <div></div>
        );
    }

};

Spinner.propTypes = {
    show: PropTypes.bool
};

Spinner.defaultProps= {
    show: true
};

export default Spinner;