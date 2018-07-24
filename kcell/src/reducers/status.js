import { combineReducers } from 'redux';
import * as actions from '../actionTypes';

const currentStatusReducer = (state = "Загрузка...", action) => {
    switch (action.type) {
        case actions.ACTION_CHANGE_STATUS:
            return action.data;
        default:
            return state;
    }
};

const progressReducer = (state = 0, action) => {
    switch (action.type) {
        case actions.ACTION_CHANGE_STATUS:
            return action.progress;
        default:
            return state;
    }
};

const statusReducer = combineReducers({
    current_status: currentStatusReducer,
    progress: progressReducer,
});

export default statusReducer;