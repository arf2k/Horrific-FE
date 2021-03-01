import { combineReducers } from 'react-redux';
import userReducer from "./user/userReducer";

export default combineReducers({
     user: userReducer
})