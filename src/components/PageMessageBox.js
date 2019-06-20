"use strict";

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const PAGE_MESSAGE_BOX_TYPE_GENERAL = 'PAGE_MESSAGE_BOX_TYPE_GENERAL';
export const PAGE_MESSAGE_BOX_TYPE_INFO = 'PAGE_MESSAGE_BOX_TYPE_INFO';
export const PAGE_MESSAGE_BOX_TYPE_ERROR = 'PAGE_MESSAGE_BOX_TYPE_ERROR';

export class PageMessageBox extends Component {
    render() {
        const {
            text,
            heading,
            show,
            type
        } = this.props;

        return(
            <div className="ib-message-box-container">
                <If condition={show}>
                    <div className={classnames(
                            'panel',
                            {
                                'panel-danger': type === PAGE_MESSAGE_BOX_TYPE_ERROR
                            },
                            {
                                'panel-info': type === PAGE_MESSAGE_BOX_TYPE_INFO
                            }
                        )}>
                        <If condition={heading !== ''}>
                            <div className="panel-heading">{heading}</div>
                        </If>
                        <div className="panel-body">{text}</div>
                    </div>
                </If>
            </div>
        )
    }
}

PageMessageBox.propTypes = {
    text: PropTypes.string,
    heading: PropTypes.string,
    type: PropTypes.string,
    show: PropTypes.bool
};

PageMessageBox.defaultProps = {
    text: '',
    heading: '',
    type: PAGE_MESSAGE_BOX_TYPE_GENERAL,
    show: true
};
