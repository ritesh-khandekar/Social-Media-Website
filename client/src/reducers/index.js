import { combineReducers } from "redux";
import authReducer from './auth'
import sidebarReducer from './sidebar'

export default combineReducers({
    authReducer, sidebarReducer
})