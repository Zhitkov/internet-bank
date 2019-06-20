"use strict";

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import generateUniqueIdForClientSession from '../../../modules/generateUniqueIdForClientSession';


class SelectListField extends Component {

    render() {
        const {
            input,
            name,
            label,
            disabled,
            options,
            meta
            } = this.props;

        const inputId = input.id || generateUniqueIdForClientSession('_input-field_');

        return <div className="form-group">
            <label htmlFor={inputId}>{ label }</label>
            <select {...input}
                    className="form-control"
                    disabled={disabled}
                    name={name}
                    id={inputId}>
                {options.map(optionItem =>
                    <option key={optionItem.key}
                            value={optionItem.value}
                            selected={optionItem.value === input.value}>
                        {optionItem.label}
                    </option>
                )}
            </select>
        </div>
    }

}


SelectListField.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool
};


export default SelectListField;
