import * as actionTypes from '../actionTypes';
import * as api from '../api/settingsApi';

export const refreshSettings = (orderNo) => async (dispatch, getState) => {
    if (getState().settings.isLoading) {
        return Promise.resolve();
    }
    dispatch({
        type: actionTypes.SETTINGS_LOADING
    });

    try {
        const response = await api.loadSettings(getState().auth.auth.token);
        const text = await response.text();
        console.log("Settings: trying to parse list...", response);
        if (response.status === 200) {
            dispatch({
                type: actionTypes.SETTINGS_LOADED,
                orderNo: orderNo,
                data: JSON.parse(text)
            });
        } else if (response.status === 401) {
            dispatch({
                type: actionTypes.SETTINGS_LOADED,
                data: {"language":"russian"},
            })
        } else {
            dispatch({
                type: actionTypes.SETTINGS_FAILED_TO_LOAD,
                data: JSON.parse(text).detail
            })
        }
    } catch (error) {
        console.log(actionTypes.SETTINGS_FAILED_TO_LOAD);
        dispatch({
            type: actionTypes.SETTINGS_FAILED_TO_LOAD,
            data: error.message
        });
    }

    return Promise.resolve();
};

export const submitSetting = (setting, value) => async (dispatch, getState) => {
    if (getState().settings.isLoading) {
        return Promise.resolve();
    }
    dispatch({
        type: actionTypes.SETTINGS_UPDATING
    });
    try {
        await api.saveSettings(setting, value, getState().auth.auth.token);
    } catch (error) {
        console.log("Error in actions/settings:",error.message);
    }

}