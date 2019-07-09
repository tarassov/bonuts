import { combineReducers } from 'redux'
import * as actionTypes from '../actions/actionTypes'
import { reducer as formReducer } from 'redux-form'

import errors  from './errors'
import authenticate from './authenticate'
import dashboard from './dashboard'
import system from './system'
import profile from './profile'
import account from './account'
import modal from './modal'
import notifier from './notifier'
import loader from './loader'
import { connectRouter } from 'connected-react-router'


const rootReducer  = (history) => combineReducers({
    router: connectRouter(history),
    errors,
    authenticate,
    dashboard,
    system,
    profile,
    account,
    modal,
    notifier,
    events: createReducer(loader,'EVENT'),
    store:createReducer(loader,'STORE'),
    regards: createReducer(loader,'REGARD'),
    departments: createReducer(loader,'DEPARTMENT'),
    profiles: createReducer(loader,'PROFILE'),
    donuts: createReducer(loader,"DONUT"),
    form: formReducer,
    })

export default rootReducer

function createReducer(reducerFunction, name){
  return (state, action) => {
        return reducerFunction(state, action,name)
    }
}
