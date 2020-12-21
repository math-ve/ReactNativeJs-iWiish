const isWelcomeScreen = (state = false, action) => {
    switch(action.type) {
        case 'SET_WELCOME_SCREEN' : {
            return action.payload
        }
        default :
            return state
    }
}

export default isWelcomeScreen;