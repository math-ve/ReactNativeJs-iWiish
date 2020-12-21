const UserData = (state = null, action) => {
    switch(action.type) {
        case 'SET_CURRENT_USER_DATA' : {
            return action.payload
        }
        default :
            return state
    }
}

export default UserData;