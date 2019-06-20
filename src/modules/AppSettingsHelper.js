"use strict";

const AppSettingsHelper = () => {
    let store,
        dataSets = {};

    return {
        init: (externalStore) => {
            store = externalStore;
        },

        handleStoreChange: () => {
            const state = store.getState();
            dataSets = state['appSettings']['dataSets'];
        },

        getDataSet: (name) => {
            if(dataSets.hasOwnProperty(name)) {
                return dataSets[name];
            }
            return null;
        }
    }
};

const appSettingsHelper = AppSettingsHelper();

export default appSettingsHelper;