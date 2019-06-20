"use strict";

import auth from './../../modules/auth.js';
import { processApiError } from './../user.js';
import { convertHistoryItemFromApi } from './../../modules/HistoryHelper.js';

export const HISTORY_GET_LIST_REQUEST = 'HISTORY_GET_LIST_REQUEST';
const historyGetListRequest = () => ({
    type: HISTORY_GET_LIST_REQUEST
});

export const HISTORY_GET_LIST_SUCCESS = 'HISTORY_GET_LIST_SUCCESS';
const historyGetListSuccess = historyItems => ({
    type: HISTORY_GET_LIST_SUCCESS,
    data: historyItems
});

export const HISTORY_GET_LIST_ERROR = 'HISTORY_GET_LIST_ERROR';
const historyGetListError = error => ({
    type: HISTORY_GET_LIST_ERROR,
    error: error
});

export const getHistoryList = (fromDate, toDate) =>
    dispatch => {
        dispatch(historyGetListRequest());
        const args = {
            fromDate: fromDate.toISOString(),
            toDate: toDate.toISOString()
        };
        return auth.authorizedCall('web.history.getList', args)
            .then(result => {
                const historyData = result.history.map(itemFromApi => convertHistoryItemFromApi(itemFromApi));

                const compareDates = (a, b) => {
                    const aDate = a.dateObject;
                    const bDate = b.dateObject;

                    if(aDate.isSame(bDate)) {
                        return 0;
                    } else {
                        if(aDate.isBefore(bDate)) {
                            return 1;
                        } else {
                            return -1;
                        }
                    }
                };

                historyData.sort(compareDates);
                dispatch(historyGetListSuccess(historyData));
            })
            .catch(error => {
                processApiError(error, dispatch, () => {
                    dispatch(historyGetListError(error.message));
                });
            });
    };