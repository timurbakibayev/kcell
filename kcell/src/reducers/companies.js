import {combineReducers} from 'redux';
import * as actions from '../actionTypes';

const companiesListReducer = (state = [], action) => {
    switch (action.type) {
        case actions.ACTION_COMPANIES_LOADED:
            let newArray = action.data;
            newArray.sort(function (a, b) {
                return (a.company_name > b.company_name) ? 1 : ((b.company_name > a.company_name) ? -1 : 0);
            });
            return newArray;
        default:
            return state;
    }
};

const isLoadingReducer = (state = false, action) => {
    switch (action.type) {
        case actions.ACTION_COMPANIES_STARTED_LOADING:
            return true;
        case actions.ACTION_COMPANIES_LOADED:
        case actions.ACTION_COMPANIES_FAILED_TO_LOAD:
            return false;
        default:
            return state;
    }
};

const loadedReducer = (state = false, action) => {
    switch (action.type) {
        case actions.ACTION_COMPANIES_STARTED_LOADING:
        case actions.ACTION_COMPANIES_FAILED_TO_LOAD:
            return false;
        case actions.ACTION_COMPANIES_LOADED:
            return true;
        default:
            return state;
    }
};

const errorMessageReducer = (state = "", action) => {
    switch (action.type) {
        case actions.ACTION_COMPANIES_FAILED_TO_LOAD:
            return action.data;
        case actions.ACTION_COMPANIES_STARTED_LOADING:
            return "";
        default:
            return state;
    }
};

const companiesReducer = combineReducers({
    list: companiesListReducer,
    loaded: loadedReducer,
    isLoading: isLoadingReducer,
    errorMessage: errorMessageReducer,
});

export default companiesReducer;