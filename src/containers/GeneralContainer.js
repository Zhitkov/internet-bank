"use strict";

import React, { Component } from 'react';
import PropTypes  from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { checkUserAuth } from './../actions/user.js';

import MainMenu from './../components/MainMenu.js';
import Footer from './../components/Footer.js';

import './../styles/app.less';

class GeneralContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.checkUserAuth();
    }

    render() {
        const { isAuthenticated, userId } = this.props;
        const { pathname } = this.props.location;

        if(isAuthenticated) {
            return (
                <div class="ib-main-container">
                    <div class="ib-central-container new-ib-central-container">
                        <MainMenu
                            pathname={pathname}
                            />
                        <div class="ib-general-container">
                            {this.props.children}
                        </div>
                        <Footer />
                        <div class="clear"></div>
                    </div>
                </div>
            );
        } else {
            return (
                <div class="ib-main-container">
                    <div class="ib-central-container new-ib-central-container">
                        <MainMenu
                            pathname={pathname}
                            />
                        <div class="clear"></div>
                        <div class="ib-general-container">
                            {this.props.children}
                        </div>
                        <Footer />
                        <div class="clear"></div>
                    </div>
                </div>
            )
        }
    }
}

GeneralContainer.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.array
    ]),
    isAuthenticated: PropTypes.bool,
    userId: PropTypes.string
};

GeneralContainer.defaultProps = {
    children: '',
    isAuthenticated: false,
    userId: ''
};

const mapStateToProps = (state, ownProps) => {
    const {
        isAuthenticated,
        profile
        } = state.user;

    return {
        isAuthenticated: isAuthenticated,
        profile: profile,
        ...ownProps
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        checkUserAuth: () => {
            dispatch(checkUserAuth());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralContainer);