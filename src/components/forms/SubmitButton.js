"use strict";

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';


class SubmitButton extends Component {
    render() {
        const {
            buttonLabel,
            isLoading
        } = this.props;

        return <div className="form-group">
            <div className="input-group">
                <If condition={!isLoading}>
                    <button className="btn new-submit-button" type="submit">{buttonLabel}</button>
                </If>
                <If condition={isLoading}>
                    <Spinner show={true}/>
                </If>
            </div>
        </div>
    }
}


SubmitButton.propTypes = {
    buttonLabel: PropTypes.string,
    isLoading: PropTypes.bool
};


export default SubmitButton;