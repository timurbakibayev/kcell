import * as actionTypes from '../actionTypes';
import * as api from '../api/companiesApi';

export const refreshCompanies = () => async (dispatch, getState) => {
    if (getState().companies.isLoading) {
        return Promise.resolve();
    }

    dispatch({
        type: actionTypes.ACTION_COMPANIES_STARTED_LOADING
    });

    try {
        const response = await api.loadCompanies(getState().auth.auth.token);
        const text = await response.text();
        if (response.status === 200) {
            dispatch({
                type: actionTypes.ACTION_COMPANIES_LOADED,
                data: JSON.parse(text)
            });
        } else if (response.status === 401) {
            dispatch({
                type: actionTypes.ACTION_COMPANIES_FAILED_TO_LOAD,
                data: getState().settings.list.language === "russian"?"Ошибка авторизации":"Please, authenticate",
            })
        } else {
            console.log("actions/companies error", JSON.parse(text));
            dispatch({
                type: actionTypes.ACTION_COMPANIES_FAILED_TO_LOAD,
                data: JSON.parse(text).detail
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.ACTION_COMPANIES_FAILED_TO_LOAD,
            data: error.message
        });
    }

    return Promise.resolve();
};

export const newCompany = (companyName) => async (dispatch, getState) => {
    if (getState().companies.creating) {
        return Promise.resolve();
    }

    dispatch({
        type: actionTypes.ACTION_COMPANY_NEW_CREATING
    });

    try {
        const response = await api.newCompany(companyName, getState().auth.auth.token);
        const text = await response.text();
        if (response.status === 201) {
            dispatch({
                type: actionTypes.ACTION_COMPANY_NEW_CREATED,
                data: JSON.parse(text)
            });
        } else if (response.status === 401) {
            dispatch({
                type: actionTypes.ACTION_COMPANY_NEW_FAILED,
                data: getState().settings.list.language === "russian"?"Ошибка авторизации":"Please, authenticate",
            })
        } else {
            dispatch({
                type: actionTypes.ACTION_COMPANY_NEW_FAILED,
                data: JSON.parse(text).detail
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.ACTION_COMPANY_NEW_FAILED,
            data: error.message
        });
    }

    return Promise.resolve();
};