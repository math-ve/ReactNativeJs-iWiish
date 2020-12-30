export const setCurrentUserID = (data) => {
    return {
        type: "SET_CURRENT_USER_ID",
        payload: data
    }
}

export const setLogStatus = (data) => {
    return {
        type : "SET_LOG_STATUS",
        payload: data
    }
}

export const setCurrentUserData = (data) => {
    return {
        type: "SET_CURRENT_USER_DATA",
        payload: data
    }
}

export const setWelcomeScreen = (data) => {
    return {
        type: "SET_WELCOME_SCREEN",
        payload: data
    }
}

export const savePresetImgUrls = (data) => {
    return {
        type: "SAVE_IMG_URLS",
        payload: data
    }
}

export const savePresetCoverUrls = (data) => {
    return {
        type: "SAVE_COVER_URLS",
        payload: data
    }
}