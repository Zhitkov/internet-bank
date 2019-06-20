"use strict";

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import classnames from 'classnames';

import { $l, LocalizedComponent } from './../../modules/LanguagesHelper.js'

import PairGeneral from './pairs/General';
import InputTextField from './fields/InputTextField';
import OptionsListField from './fields/OptionsListField';
import SelectListField from './fields/SelectListField';
import SubmitButton from './SubmitButton';
import FromGroupHeader from './elements/FromGroupHeader';

import fieldNumberNormalizer from './fieldsNormalizers/fieldNumberNormalizer';
import fieldStrictNumberNormalizer from './fieldsNormalizers/fieldStrictNumberNormalizer';


/**
 * @typedef {Object} IPaymentServiceFieldItem
 * @property {string} label
 * @property {number} value
 */

/**
 * @typedef {Object} IPaymentSourceFieldContentItem
 * @property {string} title
 * @property {number} sourceId
 * @property {string} sourceType
 * @property {number} balance
 */

/**
 * @typedef {Object} IPaymentServiceFieldBase
 * @property {string} id
 * @property {string} type
 * @property {string} title
 * @property {boolean} [isReadOnly]
 * @property {string|number|boolean} [value]
 * @property {string|number|boolean} [defaultValue]
 * @property {Array.<IPaymentServiceFieldItem>} [items]
 * @property {Object} validate
 *      @property {boolean} validate.isRequired
 * @property {Array.<IPaymentSourceFieldContentItem>} content
 */

class DynamicForm extends LocalizedComponent {

    render() {
        const props = this.props;
        /**
         * @type {Array.<IPaymentServiceFieldBase>}
         * */
        const fields = props.fields;
        const submitLabel = props.submitLabel;
        const isLoading = props.isLoading;
        const modifier = props.modifier;

        return <form className={classnames(
                        "ib-dynamic-form",
                        modifier
                     )}
                     onSubmit={this.props.handleSubmit}>
            {/*
                form submit by 'enter' needs input[type="submit"]
                see https://www.w3.org/TR/html5/forms.html#implicit-submission
            */}
            <input type="submit" style={{display:'none'}} />

            {fields.map(fieldData => {
                const fieldId = fieldData.id;
                const fieldTitle = fieldData.title;

                return <Choose>
                    <When condition={fieldData.isReadOnly}>
                        {/*TODO: [dmitry.makhnev] dirty fix for no value states */}
                        <Choose>
                            <When condition={fieldData.type === 'group'}>
                                <FromGroupHeader title={fieldData.title}  />
                            </When>
                            <When condition={fieldData.value != null}>
                                <PairGeneral key={fieldId}
                                             name={fieldTitle}
                                             value={fieldData.value.toString()}
                                             emptyValueText={$l('general', 'pair_empty_value')}
                                    />
                            </When>
                        </Choose>
                    </When>
                    <Otherwise>
                        <Choose>
                            <When condition={fieldData.type === 'text'}>
                                <Field key={fieldId}
                                       name={fieldId}
                                       type="text"
                                       label={fieldTitle}
                                       value={fieldData.value}
                                       component={InputTextField}/>
                            </When>

                            {/* TODO: [dmitry.makhnev] add special control for OTP */}
                            <When condition={fieldData.type === 'OTP'}>
                                <Field key={fieldId}
                                       name={fieldId}
                                       type="text"
                                       label={fieldTitle}
                                       value={fieldData.value}
                                       component={InputTextField}/>
                            </When>

                            <When condition={fieldData.type === 'list'}>
                                <Field key={fieldId}
                                       name={fieldId}
                                       label={fieldTitle}
                                       options={fieldData.items.map(item => ({
                                           key: item.value,
                                           value: item.value,
                                           label: item.label
                                       }))}
                                       value={fieldData.value || fieldData.defaultValue}
                                       component={OptionsListField}
                                       normalize={fieldStrictNumberNormalizer}/>
                            </When>

                            <When condition={fieldData.type === 'amount'}>
                                <Field key={fieldId}
                                       name={fieldId}
                                       type="text"
                                       label={fieldTitle}
                                       value={fieldData.value || undefined}
                                       component={InputTextField}
                                       normalize={fieldNumberNormalizer}/>
                            </When>

                            <When condition={fieldData.type === 'paymentSource'}>
                                <Field key={fieldId}
                                       name={fieldId}
                                       label={fieldTitle}
                                       value={fieldData.value}
                                       options={fieldData.content.map(paymentSourceItem => ({
                                           key: paymentSourceItem.sourceId,
                                           value: paymentSourceItem.sourceId,
                                           label: paymentSourceItem.title
                                       }))}
                                       component={SelectListField}
                                       normalize={fieldStrictNumberNormalizer}/>
                            </When>
                        </Choose>
                    </Otherwise>
                </Choose>
            })}

            <SubmitButton buttonLabel={submitLabel}
                          isLoading={isLoading} />

        </form>
    }

}


DynamicForm.propTypes = {
    fields: PropTypes.array.isRequired,
    submitLabel: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    modifier: PropTypes.string
};


export default DynamicForm;