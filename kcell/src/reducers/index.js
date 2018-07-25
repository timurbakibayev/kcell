import { combineReducers } from 'redux';
import messagesReducer from './messages';
import authReducer from './auth';
import settingsReducer from './settings';
import status from './status';
// import { reducer as formReducer } from 'redux-form';

const mainReducer = combineReducers({
    messages: messagesReducer,
    auth: authReducer,
    settings: settingsReducer,
    status: status,
});

export default mainReducer;