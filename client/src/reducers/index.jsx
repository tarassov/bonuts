import { combineReducers } from 'redux'
import * as actionTypes from '../actions/actionTypes'
import { reducer as formReducer } from 'redux-form'


const appReducer = combineReducers({

    form: formReducer
})

const rootReducer = (state, action) => {
    if (action.type === actionTypes.LOG_OUT) {
        state = undefined
    }

    return appReducer(state, action)
}

export default rootReducer
