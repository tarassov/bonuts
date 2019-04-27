import * as actionTypes from "./actionTypes"
import AuthenticateApi from "../api/authenticateApi"
import  * as commonActions from "./commonActions"


export function  authenticate(email, password) {
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

export function authenticate_by_url(secret){
  return function (dispatch) {
      dispatch(commonActions.startLoading("authenticating"))
      return AuthenticateApi.authenticate_by_url(secret).then(json => {
          localStorage.setItem('auth_token', json.auth_token)
          console.log(json.auth_token)
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
        console.log('register')
         return AuthenticateApi.register(credentials).then(json => {
            console.log(json)
            dispatch(registerSuccess(json.user))
         }).catch(error => {
            console.log(error)
            dispatch(registerFailed())
        })
    }
}
