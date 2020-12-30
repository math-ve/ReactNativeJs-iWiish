const presetCoverUrls = (state = [], action) => {
    switch(action.type) {
        case 'SAVE_COVER_URLS' : {
            return action.payload
        }
        default :
            return state
    }
}

export default presetCoverUrls;