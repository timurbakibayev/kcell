import { combineReducers } from 'redux';
import companiesReducer from './companies';
import authReducer from './auth';
import settingsReducer from './settings';
// import { reducer as formReducer } from 'redux-form';

const mainReducer = combineReducers({
    companies: companiesReducer,
    auth: authReducer,
    settings: settingsReducer,
});

export default mainReducer;