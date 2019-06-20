"use strict";

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import generateUniqueIdForClientSession from '../../../modules/generateUniqueIdForClientSession';


class InputTextField extends Component {
    render() {
        const {
            input,
            name,
            type,
            label,
            disabled,
            meta: {
                touched, error
            }
            } = this.props;

        const showError = touched && error;
        const inputId = input.id || generateUniqueIdForClientSession('_input-field_');

        return(
            <div className={classnames(
                'form-group',
                {
                    'has-error': showError
                }
            )}>

                <label htmlFor={inputId}>{label}</label>
                <input
                    {...input}
                    id={inputId}
                    name={name}
                    type={type}
                    disabled={disabled}
                    className="form-control"
                    />

                <If condition={showError}>
                    <div className='help-block'>{error}</div>
                </If>
            </div>
        )
    }
}

InputTextField.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool
};


export default InputTextField;