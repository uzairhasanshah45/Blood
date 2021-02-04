import { combineReducers } from 'redux'
import facebookUserReducer from './reducers/facebookUserReducer'
import googleUserReducer from './reducers/googleUserReducer'
import checkUserReducer from './reducers/checkUserReducer'

export default combineReducers({

    facebookUserReducer,
    googleUserReducer,
    checkUserReducer,
})