"use strict";

/*

 l10n item structure

 languages: [
    {
        key: 'this_is_item_key',
        section: 'this_is_section_name',
        values: {
            uk: 'Цэ украинскою',
            ru: 'Это по-русски',
            en: 'This is in English'
        }
    }
 ]

 */

import React, { Component } from 'react';

const defaultDateFormat = 'MM/DD/YY';
const defaultTimeFormat = 'h:mm a';

const LanguagesHelper = () => {
    var externalStore = {},
        localization = [],
        availableLocalizations = [],
        activeLocalization = '',
        localizedCallBacks = [];

    const _getValuesByTermId = (termId) => {
        const sliced = termId.split(':');
        let returned = {},
            localizationCode = '';
        for(var i = 0; i < localization.length; i++) {
            if(localization[i]['key'] == sliced[1] && localization[i]['section'] == sliced[0]) {
                returned = {
                    key: sliced[1],
                    section: sliced[0]
                };
                for(var t = 0; t < availableLocalizations.length; t++) {
                    localizationCode = availableLocalizations[t]['code'];
                    if(localizationCode in localization[i]['values']) {
                        returned[localizationCode] = localization[i]['values'][localizationCode];
                    } else {
                        returned[localizationCode] = '';
                    }
                }
            }
        }
        return returned;
    };

    const _getTermFromFormContent = (formContent) => {
        let newValue = {};
        newValue['key'] = formContent['key'];
        newValue['section'] = formContent['section'];
        newValue['values'] = {};
        let localizationName = '';
        for(var i = 0; i < availableLocalizations.length; i++) {
            localizationName = availableLocalizations[i]['code'];
            if(localizationName in formContent) {
                newValue['values'][localizationName] = formContent[localizationName];
            } else {
                newValue['values'][localizationName] = '';
            }
        }
        return newValue;
    };

    const _updateObservers = () => {
        for(var i = 0; i < localizedCallBacks.length; i++) {
            localizedCallBacks[i]();
        }
    };

    const _getTermValue = (section, key) => {
        let wasItemFound = false,
            returned = '';
        for(var i = 0; i < localization.length; i++) {
            if(localization[i]['key'] == key && localization[i]['section'] == section) {
                if(activeLocalization in localization[i]['values']) {
                    wasItemFound = true;
                    returned = localization[i]['values'][activeLocalization];
                }
            }
        }
        if(!wasItemFound) {
            returned = section + ':' + key;
        }
        return returned;
    };

    return {
        init: (store) => {
            externalStore = store;
        },

        isLocalizationEmpty: () => {
            return localization.length == 0;
        },

        getAvailableLocalizations: () => {
            return availableLocalizations;
        },

        getLocalizationList: () => {
            return localization;
        },

        handleStoreChange: () => {
            const state = externalStore.getState();
            localization = state['appSettings']['localization'];
            availableLocalizations = state['appSettings']['dataSets']['localizations'];
            activeLocalization = state['appSettings']['activeLocalization'];
            _updateObservers();
        },

        getValuesByTermId: (termId) => {
            return _getValuesByTermId(termId);
        },

        getTermFromFormContent: (formContent) => {
            return _getTermFromFormContent(formContent);
        },

        getActiveLocalization: () => {
            return activeLocalization;
        },

        addLocalizedObserver: (observer) => {
            localizedCallBacks.push(observer);
        },

        getTermValue: (section, key) => {
            return _getTermValue(section, key);
        },

        getTimeFormat: () => {
            const localizedTimeFormat = _getTermValue('general', 'time_format');
            if(localizedTimeFormat == 'general:time_format') {
                return defaultTimeFormat;
            } else {
                return localizedTimeFormat;
            }
        },

        getDateFormat: () => {
            const localizedDateFormat = _getTermValue('general', 'date_format');
            if(localizedDateFormat == 'general:date_format') {
                return defaultDateFormat;
            } else {
                return localizedDateFormat;
            }
        }

    }
};

const languagesHelper = LanguagesHelper();
export default languagesHelper;

export const $l = (section, key) => {
    return languagesHelper.getTermValue(section, key);
};

export const timeFormat = () => {
    return languagesHelper.getTimeFormat();
};

export const dateFormat = () => {
    return languagesHelper.getDateFormat();
};

export class LocalizedComponent extends Component {
    constructor(props) {
        super(props);

        this.handleLocalizedChange = this.handleLocalizedChange.bind(this);
        languagesHelper.addLocalizedObserver(this.handleLocalizedChange);
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    handleLocalizedChange() {
        if(this._isMounted) {
            this.forceUpdate();
        }
    }
}