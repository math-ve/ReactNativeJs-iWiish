const changeLogStatus = (state = false, action) => {
    switch(action.type) {
        case 'CHANGE_LOGGED_STATUS' : {
            return !action.payload
        }
        default :
            return state
    }
}

export default changeLogStatus;