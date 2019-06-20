/**
 * @typedef {Object} IDataStateBase
 * @property {boolean} isRequesting
 * @property {boolean} isUpdating
 * @property {boolean} isError
 * @property {string} errorText
 * @property {boolean} hasData
 */

/**
 * @typedef {Object} IDataState
 * @property {boolean} isRequesting
 * @property {boolean} isUpdating
 * @property {boolean} isError
 * @property {string} errorText
 * @property {boolean} hasData
 * @property {Object|Array} data
 */

/**
 * @param {Object|Array} data
 * @return IDataState
 */
export const createDataState = (data = {}) => ({
    isRequesting: false,
    isUpdating: false,

    isError: false,
    errorText: '',

    hasData: false,

    data: data
});

/**
 * @param {IDataState} dataState
 * @return {IDataState}
 */
export const dataStateToRequesting = dataState => ({
    ...dataState,
    isRequesting: true
});


/**
 * @param {IDataState} dataState
 * @return {IDataState}
 */
export const dataStateToUpdate = dataState => ({
    ...dataState,
    isRequesting: true,
    isUpdating: true
});


/**
 * @param {IDataState} dataState
 * @param {Object|Array} data
 * @return {IDataState}
 */
export const resolveDataForDataState = (dataState, data) => ({
    ...dataState,
    isRequesting: false,
    isUpdating: false,

    isError: false,
    errorText: '',

    hasData: true,

    data
});

/**
 * @param {IDataState} dataState
 * @param {String} errorText
 * @return {IDataState}
 */
export const dataStateToError = (dataState, errorText) => ({
    ...dataState,

    isRequesting: false,
    isUpdating: false,

    isError: true,
    errorText
});

/**
 * @param {IDataState...} dataState
 * @return {IDataStateBase}
 */
export const extractResultDataState = (...dataState) => {
    const resultDataStateBase = {
        isRequesting: false,
        isUpdating: false,

        isError: false,
        errorText: '',

        hasData: true,
    };


    for (let i = 0, iMax = dataState.length; i !== iMax; i += 1) {
        const currentDataState = dataState[i];

        if (currentDataState.isRequesting) {
            resultDataStateBase.isRequesting = true;
        }

        if (currentDataState.isUpdating) {
            resultDataStateBase.isUpdating = true;
        }

        if (resultDataStateBase.hasData && !currentDataState.hasData) {
            resultDataStateBase.hasData = false;
        }

        // save first error
        if (!resultDataStateBase.isError && currentDataState.isError) {
            resultDataStateBase.isError = true;
            resultDataStateBase.errorText = currentDataState.errorText;
        }
    }

    return resultDataStateBase;
};