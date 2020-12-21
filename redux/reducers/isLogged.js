const isLogged = (state = false, action) => {
    switch(action.type) {
        case 'SET_LOG_STATUS' : {
            return action.payload
        }
        default :
            return state
    }
}

export default isLogged;