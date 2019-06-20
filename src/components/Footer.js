"use strict";

import React, { Component } from 'react';
import PropTypes  from 'prop-types';

const Footer = () => {
    return(
        <div class="new-ib-footer">
            
            <div class="ib-contacts-container">
                <div>Žitná 1578/52, 120 00 Praha 2-Nové Město, Czech Republic</div>
                <div>
                    <span class="ib-link-mail"><a href="mailto:mail@europay.cz">mail@europay.cz</a></span>
                    <span class="ib-link-phone">(+420)228883998</span>
                    <span class="ib-link-site"><a href="http://www.europay.cz" target="_blank">www.europay.cz</a></span>
                </div>
            </div>
            <div class="ib-legal-container">
                <div>BIC/SWIFT code: ERSOCZPP</div>
                <div>Europay © 2008-2018</div>
                <div>Registration number: 28435206</div>
            </div>
        </div>
    );
};

export default Footer;