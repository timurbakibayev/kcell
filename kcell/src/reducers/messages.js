import {combineReducers} from 'redux';
import * as actions from '../actionTypes';
import data from "../defaultlist.json";

const messagesListReducer = (state = data, action) => {
    switch (action.type) {
        case actions.ACTION_MESSAGES_SENT:
            state.push(action.data);
            return state;
        default:
            return state;
    }
};

const messagesReducer = combineReducers({
    list: messagesListReducer,
});

export default messagesReducer;