const UserID = (state = null, action) => {
    switch(action.type) {
        case 'SET_CURRENT_USER_ID' : {
            return action.payload
        }
        default :
            return state
    }
}

export default UserID;