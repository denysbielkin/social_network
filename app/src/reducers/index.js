import {combineReducers} from 'redux';
import formReducer from './formReducer';
import alertReducer from './alertReducer';
import friendReducer from './friendReducer';
export default combineReducers({
    user: formReducer,
    alert: alertReducer,
    friends: friendReducer
});
