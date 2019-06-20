"use strict";

import React  from 'react';

import './InlineError.less';

const InlineError = ({ title, text, show }) => {
    return(
        <div>
            <If condition={show}>
                <div class="ib-form-error-container ib-block-margin">
                    <div class="panel panel-danger">
                        <div class="panel-heading">{title}</div>
                        <div class="panel-body">{text}</div>
                    </div>
                </div>
            </If>
        </div>
    )
};

export default InlineError;
