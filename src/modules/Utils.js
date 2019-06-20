"use strict";

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.deCapitalizeFirstLetter = function() {
    return this.charAt(0).toLowerCase() + this.slice(1);
};

export const bindStr = function(values, int) {
    var returned;
    if(!Array.isArray(values)) {
        returned = null;
    } else {
        for(var i = 0, item; i < values.length; i++) {
            item = values[i];
            if('int' in item) {
                if(item.hasOwnProperty('int')) {
                    if(item['int'] == int) {
                        if('str' in item) {
                            if(item.hasOwnProperty('str')) {
                                returned = item['str'];
                            }
                        }
                    }
                }
            }
        }
    }
    return returned;
};

export const bindInt = function(values, str) {
    var returned;
    if(!Array.isArray(values)) {
        returned = null;
    } else {
        for(var i = 0, item; i < values.length; i++) {
            item = values[i];
            if('str' in item) {
                if(item.hasOwnProperty('str')) {
                    if(item['str'] == str) {
                        if('int' in item) {
                            if(item.hasOwnProperty('int')) {
                                returned = item['int'];
                            }
                        }
                    }
                }
            }
        }
    }
    return returned;
};

export const convertApiNameToCamelCase = function(apiCaseString) {
    if(apiCaseString === null) {
        return apiCaseString;
    } else {
        let parts = apiCaseString.split('.');
        let convertedString = '';
        for(let i = 0; i < parts.length; i++) {
            if(i == 0) {
                convertedString += parts[i].deCapitalizeFirstLetter();
            } else {
                convertedString += parts[i].toLocaleLowerCase().capitalizeFirstLetter();
            }
        }
        return convertedString;
    }
};


export const getCountryPhonePrefixByCode = function(countries, countryCode) {
    var returned = countryCode;
    if(countries != null) {
        for(var i = 0; i < countries.length; i++) {
            if(countries[i]['code'] == countryCode) {
                returned = countries[i]['phoneCode'];
            }
        }
    }
    return returned;
};