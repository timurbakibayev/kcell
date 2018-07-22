import * as actionTypes from '../actionTypes'
import * as api from '../api/loginApi';

export const requestLogin = (creds) => async (dispatch, getState) => {
    console.log("Trying to log in with ", creds);
    if (getState().auth.auth.isLoading) {
        console.log("Oh, it's still loading...");
        return Promise.resolve();
    }

    dispatch({
        type: actionTypes.LOGIN_REQUEST,
        isLoading: true,
        isAuthenticated: false,
        token: '',
        errorMessage: '',
        data: '',
        creds
    });

    try {
        const response = await api.loginUser(creds);
        console.log("Response to login", response);
        const text = await response.text();
        if (response.status === 200) {
            const userDetail = await api.userDetail(creds,JSON.parse(text).token);
            const textDetail = await userDetail.text();
            console.log('User detail',textDetail);
            creds["details"] = JSON.parse(textDetail);
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                token: JSON.parse(text),
                errorMessage: '',
                isAuthenticated: true,
                isLoading: false,
                data: JSON.parse(textDetail),
                creds
            });
        } else if (response.status === 400) {
            dispatch({
                type: actionTypes.LOGIN_FAILURE,
                token: '',
                isAuthenticated: false,
                errorMessage: "Неверный логин или пароль",
                isLoading: false,
                data: JSON.parse(text).non_field_errors,
                creds
            })
        } else {
            dispatch({
                type: actionTypes.LOGIN_FAILURE,
                isAuthenticated: false,
                isLoading: false,
                errorMessage: JSON.parse(text).non_field_errors,
                data: '',
                token: '',
                creds
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.LOGIN_FAILURE,
            data: error.message,
            isAuthenticated: false,
            isLoading: false,
            errorMessage: '',
            token: '',
            creds
        });
    }

    return Promise.resolve();
}

export function requestLogout() {
    return {
        type: actionTypes.LOGOUT_REQUEST,
        isLoading: true,
        isAuthenticated: true
    }
}

export function receiveLogout() {
    return {
        type: actionTypes.LOGOUT_SUCCESS,
        isLoading: false,
        isAuthenticated: false
    }
}

export function logoutUser() {
    return dispatch => {
        dispatch(requestLogout())
        localStorage.removeItem('token')
        dispatch({
            type: actionTypes.ACTION_ORDERS_CLEAR,
        })
        dispatch(receiveLogout())
    }
}
