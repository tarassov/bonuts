import * as actionTypes from "./actionTypes"
import AuthenticateApi from "../api/authenticateApi"
import  * as commonActions from "./commonActions"
import { loadProfile } from "./profile/profileActions";
import Storage from "common/storage";

import *  as notifierActions from "actions/notifierActions"

export function authenticate(email, password,tenant) {
    return do_authenticate(AuthenticateApi.authenticate,[email, password,tenant],'AUTHENTICATE')   
}    
export function demo_authenticate() {
    return do_authenticate(AuthenticateApi.demo_authenticate,[],'AUTHENTICATE')   
}
export function refreshToken() {
    return do_authenticate(AuthenticateApi.refreshToken,[],'REFRESH_TOKEN')        
}

function do_authenticate(apiFunction, args, actionName) {
    return function (dispatch) {
      const options = {
            useToken: false,
            action: actionName, 
            name: undefined, 
            apiFunction:   apiFunction, 
            args:args
      }
      return commonActions.callApi(
        dispatch,
        options
        ).then(json => {
            console.log(json)
            Storage.setToken(json.auth_token)
            
            let currentTenant 
            if (json.currentTenant!==null){
                currentTenant = json.currentTenant
            }
            else if (json.tenants.length===1){
                currentTenant = Storage.setTenant(json.tenants[0])
            }
            
            dispatch(authenticateSuccess(json.auth_token,json.email,json.tenants,currentTenant))
            //if (currentTenant !== undefined && currentTenant!==null) 
            dispatch(loadProfile())
        })
    }
}



export function tenantLogin(tenant){
    return function (dispatch) {
        Storage.setTenant(tenant)
        dispatch({
            type: actionTypes.TENANT_LOGIN,
            currentTenant: tenant,
        })
    }
}




 
export function authenticate_by_url(secret){
  return function (dispatch) {
      dispatch(commonActions.startLoading("authenticating"))
      return AuthenticateApi.authenticate_by_url(secret).then(json => {
          Storage.setToken(json.auth_token)
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
        Storage.removeItems()
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
        let token  = Storage.getToken()
        let currentTenant = Storage.getTenant()
        if (token) {
            dispatch(authenticateChecked(token,currentTenant))
        }
        else{
            dispatch(authenticateFailed())
        }
    }
}



function authenticateSuccess(token, username,tenants,currentTenant){
    return {
        type: actionTypes.AUTHENTICATE_SUCCESS,
        token: token,
        username:username,
        tenants,
        currentTenant
    }
}

function authenticateChecked(token, currentTenant){
    return {
        type: actionTypes.AUTHENTICATE_CHECKED,
        token: token,
        currentTenant
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
