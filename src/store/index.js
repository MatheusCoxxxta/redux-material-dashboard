import { combineReducers } from 'redux';
import { taskReducer } from './taskReducer'
import { alertReducer } from './alertReducer'

const mainReducer = combineReducers({
  tasks: taskReducer,
  alert: alertReducer
});

export default mainReducer;
