import {combineReducers} from 'redux';

import UserID from './UserID'
import isLogged from './isLogged'
import UserData from './UserData'
import isWelcomeScreen from './isWelcomeScreen'
import PresetImgUrls from './presetImgUrls'
import PresetCoverUrls from './presetCoverUrls'

const allReducers = combineReducers({
    UserID,
    isLogged,
    UserData,
    isWelcomeScreen,
    PresetImgUrls,
    PresetCoverUrls
})

export default allReducers;