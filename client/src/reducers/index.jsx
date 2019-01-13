import { combineReducers } from 'redux'
import * as actionTypes from '../actions/actionTypes'
import { reducer as formReducer } from 'redux-form'

import errors  from './errors'
import authenticate from './authenticate'
import dashboard from './dashboard'
import system from './system'
import account from './account'
import modal from './modal'
import { connectRouter } from 'connected-react-router'

const rootReducer  = (history) => combineReducers({
    router: connectRouter(history),
    errors,
    authenticate,
    dashboard,
    system,
    account,
    modal,
    form: formReducer
})

export default rootReducer
