"use strict";


/**
 * @typedef {Object} IAccountAPIED
 * @property {number} account_id
 * @property {string} external_id
 * @property {number} type
 *
 * @property {number} balance
 *
 * @property {number} updated
 *
 * @property {number} currency
 * @property {number} currency_name
 *
 * @property {number} user_id
 */


/**
 * @typedef {Object} IAccountED
 * @property {number} id
 * @property {string} externalId
 * @property {string} type
 *
 * @property {number} balance
 *
 * @property {string} updated
 *
 * @property {number} currency
 * @property {string} currencyName
 *
 */

/**
 * @param {IAccountAPIED} apiFormat
 * @return {IAccountED}
 */
export const convertAccountEDForClient = apiFormat => ({
    id: apiFormat.account_id,
    externalId: apiFormat.external_id,
    type: apiFormat.type,

    balance: apiFormat.balance,

    updated: apiFormat.updated,

    currency: apiFormat.currency,
    currencyName: apiFormat.currency_name
});
