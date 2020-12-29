import * as actionTypes from "./actionTypes"
import AuthenticateApi from "../api/authenticateApi"
import  * as commonActions from "./commonActions"
import { loadProfile } from "./profile/profileActions";

import *  as notifierActions from "actions/notifierActions"
export function  authenticate_old(email, password) {
    return function (dispatch) {
        return AuthenticateApi.authenticate(email, password).then(json => {
            console.log(json)
            if (json.error || (json.ok!==undefined && !json.ok) || (json.unauthorized!==undefined && json.unauthorized)){
              dispatch(authenticateFailed())
            }
            else{
              localStorage.setItem('auth_token', json.auth_token)
              dispatch(authenticateSuccess(json.auth_token,email))
            }
        }).catch(error => {
            dispatch(authenticateFailed())
        })
    }
}

export function authenticate(email, password) {
    return function (dispatch) {
      const options = {
            useToken: false,
            action: 'AUTHENTICATE', 
            name: undefined, 
            apiFunction:   AuthenticateApi.authenticate, 
            args:[email, password]
      }
      return commonActions.callApi(
        dispatch,
        options
        ).then(json => {
            localStorage.setItem('auth_token', json.auth_token)
            localStorage.setItem('tenant', json.tenant)
            dispatch(authenticateSuccess(json.auth_token,email))
            dispatch(loadProfile())
        })
    }
  }


export function demo_authenticate() {
    return function (dispatch) {
      const options = {
            useToken: false,
            action: 'AUTHENTICATE', 
            name: undefined, 
            apiFunction:   AuthenticateApi.demo_authenticate, 
            args:[]
      }
      return commonActions.callApi(
        dispatch,
        options
        ).then(json => {
            localStorage.setItem('auth_token', json.auth_token)
            localStorage.setItem('tenant', json.tenant)
            dispatch(authenticateSuccess(json.auth_token,json.email))
            dispatch(loadProfile())
        })
    }
  }

export function authenticate_by_url(secret){
  return function (dispatch) {
      dispatch(commonActions.startLoading("authenticating"))
      return AuthenticateApi.authenticate_by_url(secret).then(json => {
          localStorage.setItem('auth_token', json.auth_token)
          if (json.auth_token == null) {
            dispatch(authenticateFailed())
          }
          else {
            dispatch(authenticateSuccess(json.auth_token,null))
          }
      }).catch(error => {
          console.log(error)
          dispatch(authenticateFailed())
      }).finally(()=>{
        dispatch(commonActions.endLoading())
    })
  }
}

export function  logout() {
    return function (dispatch) {
        localStorage.removeItem('auth_token')
        dispatch(logOutSuccess())
    }
}

export function validateEmail(email) {
    return function(dispatch) {
        return AuthenticateApi.validateEmail(email).then(res => {
            console.log(res)
        })
    }
}

export function checkAuth() {
    return function (dispatch) {
        let token  = localStorage.getItem('auth_token')
        if (token) {
            dispatch(authenticateSuccess(token))
        }
        else{
            dispatch(authenticateFailed())
        }
    }
}



function authenticateSuccess(token, username){
    return {
        type: actionTypes.AUTHENTICATE_SUCCESS,
        token: token,
        username:username
    }
}
function authenticateFailed(){
    return {type: actionTypes.AUTHENTICATE_FAILED}
}

function logOutSuccess() {
    return{type: actionTypes.LOG_OUT}
}

function registerSuccess(user) {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        success: true,
        user: user
    }
}

function registerFailed() {
    return {
        type: actionTypes.REGISTER_FAILED,
        success: false
    }
}
export function register(credentials){
    return function (dispatch) {
        localStorage.setItem('tenant', credentials.tenant.name)

        const options = {
            useToken: false,
            action: 'register',
            name: 'events', 
            apiFunction:   AuthenticateApi.register, 
            args:[credentials]
          }
        return commonActions.callApi( dispatch,options).then(json =>{

            let user = json.users[0]
            dispatch(registerSuccess(user))
                     
            dispatch(notifierActions.enqueueSnackbar({
                message: user.name+ " ",
                message2: "created",
                options: {
                    variant: 'success',
                }
              })
            )  
            dispatch(notifierActions.enqueueSnackbar({
                message: "Please confirm your email",
                options: {
                    variant: 'info',
                }
              })
            )
         }).catch(error => {             dispatch(notifierActions.enqueueSnackbar({
                message: error.message,
                options: {
                    variant: 'error',
                }
              })
            )
            dispatch(registerFailed())
        })
    }
}
