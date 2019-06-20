"use strict";

import auth from './../../modules/auth.js';
import { processApiError } from './../user.js';


export const HISTORY_GET_ITEM_DETAILS_REQUEST = 'HISTORY_GET_ITEM_DETAILS_REQUEST';
const historyGetItemDetailsRequest = () => ({
    type: HISTORY_GET_ITEM_DETAILS_REQUEST
});

export const HISTORY_GET_ITEM_DETAILS_SUCCESS = 'HISTORY_GET_ITEM_DETAILS_SUCCESS';
const historyGetItemDetailsSuccess = historyItemDetails => ({
    type: HISTORY_GET_ITEM_DETAILS_SUCCESS,
    data: historyItemDetails
});

export const HISTORY_GET_ITEM_DETAILS_ERROR = 'HISTORY_GET_ITEM_DETAILS_ERROR';
const historyGetItemDetailsError = error => ({
    type: HISTORY_GET_ITEM_DETAILS_ERROR,
    error
});


// const mockAnswer = {
//     "id": 17,
//     "type": 4,
//     "source_id": 5,
//     "destination_id": null,
//     "user_id": 3,
//     "currency": 840,
//     "amount": 123,
//     "created": "2018-01-14T13:44:39.830Z",
//     "transaction_details": [
//         {
//             "title": "paymentSource",
//             "value": {
//                 "id": 5,
//                 "type": "account",
//                 "title": "DO70DMDM00000000000000000005"
//             }
//         },
//         {
//             "title": "customerName",
//             "value": "Customer name"
//         },
//         {
//             "title": "paymentDocumentId",
//             "value": 210
//         },
//         {
//             "title": "transferType",
//             "value": 1
//         },
//         {
//             "title": "feePayer",
//             "value": 1
//         },
//         {
//             "title": "currency",
//             "value": 840
//         },
//         {
//             "title": "beneficiaryGroup"
//         },
//         {
//             "title": "beneficiary"
//         },
//         {
//             "title": "beneficiaryRegistrationNumber"
//         },
//         {
//             "title": "beneficiaryAddress"
//         },
//         {
//             "title": "beneficiaryCountry"
//         },
//         {
//             "title": "beneficiaryAccount"
//         },
//         {
//             "title": "beneficiaryInformation"
//         },
//         {
//             "title": "beneficiaryBankGroup"
//         },
//         {
//             "title": "beneficiaryBankSwfit"
//         },
//         {
//             "title": "beneficiaryBankName"
//         },
//         {
//             "title": "beneficiaryBankAddress"
//         },
//         {
//             "title": "beneficiaryBankCountry"
//         }
//     ],
//     "related_transaction": null,
//     "currency_name": "USD",
//     "source_details": {
//         "name": "DO70DMDM00000000000000000005",
//         "currency": 840,
//         "currency_name": "USD"
//     },
//     "user_details": {
//         "login": "+79119083791",
//         "name": "Dmitry",
//         "lastname": "Makhnev"
//     }
// };


export const getHistoryItemDetails = operationId =>
    dispatch => {
        dispatch(historyGetItemDetailsRequest());

        return auth.authorizedCall("web.history.getDetails", { operationId })
        // return new Promise((resolve, reject) => {
        //         setTimeout(
        //             () => {
        //                 resolve(mockAnswer);
        //             },
        //             200
        //         );
        //     })
            .then(result => {
                dispatch(historyGetItemDetailsSuccess(result));
            })
            .catch(error => {
                processApiError(error, dispatch, () => {
                    dispatch(historyGetItemDetailsError(error));
                });
            })
    };