import * as actionTypes from '../actionTypes';
import * as api from '../api/companiesApi';

function wait(ms) {
    return new Promise(r => setTimeout(r, ms));
}

function template(text, recepient) {
    return text.replace("name", recepient.name);
}

export const sendSMS = (recipientsList, text) => async (dispatch, getState) => {
    if (getState().companies.isLoading) {
        return Promise.resolve();
    }

    dispatch({
        type: actionTypes.ACTION_CHANGE_STATUS,
        data: "Подготовка к отправке...",
        progress: 0,
    });

    let i=0;
    for (const recipient of recipientsList) {
        dispatch({
            type: actionTypes.ACTION_CHANGE_STATUS,
            data: "Отправляется сообщение на номер: " + recipient.phone + "\n \n" + template(text, recipient),
            progress: recipientsList==0?0:(i/recipientsList.length*100),
        });
        i++;

        await wait(recipientsList.length <= 1? 2000: 700);
    }

    dispatch({
        type: actionTypes.ACTION_CHANGE_STATUS,
        data: "Готово! Перейдите в отчеты для просмотра отправленных сообщений.",
        progress: 100,
    });


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