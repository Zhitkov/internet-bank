"use strict";

import React, { Component } from 'react';

class OptionsListField extends Component {
    render() {
        const {
            input,
            label,
            options,
            meta
            } = this.props;
        let currentValue = input.value;

        if ((currentValue === '') && (meta.initial)) {
            currentValue = meta.initial;
        }
        return(
            <div className="form-group">
                <label>{label}</label>
                { options.map(option => (
                    <div className="radio" key={option.key}>
                        <label>
                            <input
                                {...input}
                                type="radio"
                                value={option.value}
                                checked={currentValue.toString() === option.value.toString()}
                                />
                            {option['label']}
                        </label>
                    </div>
                )) }
            </div>
        )
    }
}

export default OptionsListField;