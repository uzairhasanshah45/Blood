function checkUserReducer (state = {}, action) {

    switch(action.type) {
        case 'SET_LOC': {
            return { ...state, user: action.data }
        }
        case 'LOC': {
            return { ...state, user: null }
        }
        default: {
            return state
        }
    }
}


export default checkUserReducer
