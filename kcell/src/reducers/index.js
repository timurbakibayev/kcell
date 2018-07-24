import { combineReducers } from 'redux';
import companiesReducer from './companies';
import authReducer from './auth';
import settingsReducer from './settings';
import status from './status';
// import { reducer as formReducer } from 'redux-form';

const mainReducer = combineReducers({
    companies: companiesReducer,
    auth: authReducer,
    settings: settingsReducer,
    status: status,
});

export default mainReducer;