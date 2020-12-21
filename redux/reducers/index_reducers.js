import {combineReducers} from 'redux';

import UserID from './UserID'
import isLogged from './isLogged'
import UserData from './UserData'
import isWelcomeScreen from './isWelcomeScreen'

const allReducers = combineReducers({
    UserID,
    isLogged,
    UserData,
    isWelcomeScreen
})

export default allReducers;