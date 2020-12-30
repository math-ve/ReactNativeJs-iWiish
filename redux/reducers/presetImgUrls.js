const presetImgUrls = (state = [], action) => {
    switch(action.type) {
        case 'SAVE_IMG_URLS' : {
            return action.payload
        }
        default :
            return state
    }
}

export default presetImgUrls;