import { combineReducers } from 'redux';
import login from './loginReducer';
import questionReducer from './questionReducer';

const rootReducer = combineReducers({ login, questionReducer });

export default rootReducer;
