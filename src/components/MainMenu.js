"use strict";

import React, { Component } from 'react';
import PropTypes  from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import localizationHelper, { $l, LocalizedComponent } from './../modules/LanguagesHelper.js';
import LanguagesSwitcher from './../components/LanguagesSwitcher/LanguagesSwitcher.js';

import {
    userLogout
} from './../actions/user.js';

class MainMenu extends LocalizedComponent {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(e) {
        e.preventDefault();
        this.props.userLogout($l('web_messages', 'logout_message'));
    }

    getMenuItemClassName(path, suffix) {
        const { pathname } = this.props;
        let className = 'ib-main-menu-item ib-menu-item_' + suffix;
        if(path == '/') {
            if(pathname == '/' || pathname == '') {
                className += ' ib-main-menu-item_active';
            }
        } else {
            if(pathname.indexOf(path) >= 0) {
                className += ' ib-main-menu-item_active';
            }
        }
        if(suffix == 'registration') {
            className += ' ib-main-menu-item-alone';
        }
        return className;
    }

    render() {
        const {
                userId
                } = this.props.userProfile;
        const {
            isAuthenticated
            } = this.props;

        return(
            <div class="ib-main-menu-container">
                <div class="ib-main-menu-first-line new-ib-main-menu-first-line">
                    <div class="ib-general-logotype-container">
                        <div class="ib-general-logotype"></div>
                    </div>
                    <Choose>
                        <When condition={!isAuthenticated}>
                        <div class="ib-main-menu-user new-ib-main-menu-user">
                                <div class="ib-languages">
                                    <LanguagesSwitcher />
                                </div>
                                <ul class="ib-main-menu-component ib-main-menu-one-item new-registration-btn">
                                    <li class={this.getMenuItemClassName('/registration', 'registration')}><Link to="/registration">{$l('web_main_menu', 'registration')}</Link></li>
                                </ul>
                            </div>
                        </When>
                        <Otherwise>
                        Рубен скоро скинет варик
                    </Otherwise>
                    </Choose>
                </div>
                <div class="clear"></div>
            </div>
        );
    }
}

const mapSateToProps = (state, ownProps) => {
    const { profile } = state.user;
    return {
        userProfile: profile,
        isAuthenticated: state.user.isAuthenticated,
        ...ownProps
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        userLogout: function() {
            dispatch(userLogout());
        }
    }
};

export default connect(mapSateToProps, mapDispatchToProps)(MainMenu);