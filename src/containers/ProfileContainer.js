"use strict";

import React, { Component } from 'react';
import PropTypes  from 'prop-types';
import { connect } from 'react-redux';

import { $l, LocalizedComponent } from './../modules/LanguagesHelper.js';

import Spinner from './../components/Spinner.js';
import {
    PAGE_MESSAGE_BOX_TYPE_ERROR,
    PageMessageBox
} from './../components/PageMessageBox.js';
import {
    PairGeneral,
    PairPhoneNumberInternational
} from './../components/forms/pairs';

import {
    profileGet
} from './../actions/profile.js'

class ProfileContainer extends LocalizedComponent {
    componentDidMount() {
        this.props.profileGet();
    }

    render() {
        const {
            isRequesting,
            isError,
            errorText,
            data,
            hasData
            } = this.props;

        const businessProfile = data['businessProfile'];

        let fullName = '';
        if(hasData) {
            fullName = data['name'] + ' ' + data['last_name'];
        }

        return(
            <div>
                <Spinner
                    show={isRequesting}
                    />

                <PageMessageBox
                    show={isError}
                    text={errorText}
                    type={PAGE_MESSAGE_BOX_TYPE_ERROR}
                    />

                <h1>{$l('web_profile', 'title')}</h1>
                <If condition={!isError && hasData}>
                    <div className="row">
                        <div className="col-md-6">
                            <h2>{$l('web_profile', 'general')}</h2>
                            <PairGeneral
                                key={$l('web_profile', 'name')}
                                name={$l('web_profile', 'name')}
                                value={fullName}
                                emptyValueText={$l('general', 'pair_empty_value')}
                                />
                            <PairGeneral
                                key={$l('web_profile', 'user_residence')}
                                name={$l('web_profile', 'user_residence')}
                                value={data['citizenship']}
                                emptyValueText={$l('general', 'pair_empty_value')}
                                />
                            <PairGeneral
                                key={$l('web_profile', 'document_number')}
                                name={$l('web_profile', 'document_number')}
                                value={data['id_document_num']}
                                emptyValueText={$l('general', 'pair_empty_value')}
                                />
                        </div>
                        <div className="col-md-6">
                            <h2>{$l('web_profile', 'personal')}</h2>
                            <PairPhoneNumberInternational
                                key={$l('web_profile', 'primary_phone')}
                                name={$l('web_profile', 'primary_phone')}
                                value={data['primary_phone']}
                                emptyValueText={$l('general', 'pair_empty_value')}
                                />
                            <PairPhoneNumberInternational
                                key={$l('web_profile', 'secondary_phone')}
                                name={$l('web_profile', 'secondary_phone')}
                                value={data['secondary_phone']}
                                emptyValueText={$l('general', 'pair_empty_value')}
                                />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <h2>{$l('web_profile', 'business')}</h2>
                            <PairGeneral
                                key={$l('web_profile', 'business_company_name')}
                                name={$l('web_profile', 'business_company_name')}
                                value={businessProfile['company_name']}
                                />
                            <PairGeneral
                                key={$l('web_profile', 'business_company_residence')}
                                name={$l('web_profile', 'business_company_residence')}
                                value={businessProfile['company_residence']}
                                emptyValueText={$l('general', 'pair_empty_value')}
                                />
                            <PairGeneral
                                key={$l('web_profile', 'business_type')}
                                name={$l('web_profile', 'business_type')}
                                value={businessProfile['business_type']}
                                emptyValueText={$l('general', 'pair_empty_value')}
                                />
                        </div>
                    </div>
                </If>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {
        profile
        } = state;
    return {
        ...profile,
        ...ownProps
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        profileGet: function() {
            dispatch(profileGet());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);