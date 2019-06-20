"use strict";

import React, { Component } from 'react';

import './FromGroupHeader.less';


class FromGroupHeader extends Component {

    render() {
        const title = this.props.title;

        return <div className="ib-form-subtitle">
            <h4 className="ib-form-subtitle_text">{title}</h4>
        </div>
    }

}

export default FromGroupHeader;