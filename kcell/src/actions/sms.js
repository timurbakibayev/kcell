import * as actionTypes from '../actionTypes';
import * as api from '../api/companiesApi';

function wait(ms) {
    return new Promise(r => setTimeout(r, ms));
}

function template(text, recepient) {
    return text.replace("name", recepient.name);
}

export const sendSMS = (messagesList, text) => async (dispatch, getState) => {
    dispatch({
        type: actionTypes.ACTION_CHANGE_STATUS,
        data: "Подготовка к отправке...",
        progress: 0,
    });

    let i=0;
    for (const message of messagesList) {
        dispatch({
            type: actionTypes.ACTION_CHANGE_STATUS,
            data: "Отправляется сообщение на номер: " + message.phone + "\n \n" + template(text, message),
            progress: messagesList.length===0?0:(Math.round(i/messagesList.length*100)),
        });
        message.text = template(text, message);
        message.delivered = true;
        dispatch({
            type: actionTypes.ACTION_MESSAGES_SENT,
            data: message,
        });
        i++;

        await wait(messagesList.length <= 1? 2000: 300);
    }

    dispatch({
        type: actionTypes.ACTION_CHANGE_STATUS,
        data: "Готово! Перейдите в поиск для просмотра отправленных сообщений.",
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