import * as actionTypes from "actions/actionTypes"
import * as actions from "actions/actionTypes"
import * as profileActionTypes from "actions/profile/actionTypes"
import profileApi from "api/profileApi"
import  * as commonActions from "actions/commonActions"
import *  as notifierActions from "actions/notifierActions"
import tenantApi from 'api/tenantApi'
import ListActions from "actions/listActions"
import apis  from 'api/apiRoot'

export function loadProfile() {
    return function (dispatch) {
        return commonActions.callApi(
            dispatch,
            {
              apiFunction: profileApi.getProfile,
              args:[],
              name:"profile",
              action: "load",              
            }).then(json =>{
              var profile = {user_id: json.included.users[0].id, ...json.included.users[0],...json.profile}
              //console.log(profile)
            commonActions.apiResult(dispatch,actions.loadSuccess('PROFILE'), {item:profile},()=>{return{user_not_found: true}})
              dispatch(loadSelfBalance(json.profile.self_account.id))
              dispatch(loadDistribBalance(json.profile.distrib_account.id))
            })
    }
}

export function loadAccount() {
  return function (dispatch) {
      const options = {
        useToken: true,
        action: 'load',
        name: 'ACCOUNT', 
        apiFunction:profileApi.getProfile,
        args:[]
      }
      return commonActions.callApi(
          dispatch,options).then(json =>{
            var profile = {user_id: json.included.users[0].id, ...json.included.users[0],...json.profile}
            commonActions.apiResult(dispatch,actions.loadSuccess('ACCOUNT'), {item:profile},()=>{return{user_not_found: true}})
          })
  }
}

export function loadTenantByDomain(domain){
  return function(dispatch){
    const options = {
      useToken: false,
      action: 'load',
      name: 'CURRENT_TENANT', 
      apiFunction:tenantApi.loadTenantByDomain,
      args:[domain]
    }

    return commonActions.callApi(dispatch,options).then(json=>{
      commonActions.apiResult(dispatch,actionTypes.loadSuccess('CURRENT_TENANT'),{tenant: json.tenant})
    })

  }
}


export function loadByToken(token){
  return function (dispatch) {
      const options = {
        useToken: true,
        action: 'load',
        name: 'PROFILE', 
        apiFunction:profileApi.getByToken,
        args:[token]
      }

      return commonActions.callApi(
          dispatch,options).then(json =>{
             commonActions.apiResult(dispatch,actions.loadSuccess('PROFILE'), {item:json.user},()=>{return{user_not_found: true}})
          })
  }
}

export function loadByRecoverToken(token){
  return function (dispatch) {
      const options = {
        useToken: true,
        action: 'load',
        name: 'PROFILE', 
        apiFunction:profileApi.getByRecoverToken,
        args:[token]
      }    
      return commonActions.callApi(
          dispatch,options).then(json =>{
             commonActions.apiResult(dispatch,actions.loadSuccess('PROFILE'), {item:json.user},()=>{return{user_not_found: true}})
          })
  }
}


export function confirmEmail(token){
  return function (dispatch) {
    const options = {
      useToken: true,
      action: 'confirm',
      name: 'email', 
      apiFunction:profileApi.confirmEmail,
      args:[token]
    }    

      return commonActions.callApi(
          dispatch,options).then(json =>{
            dispatch(confirmEmailSuccess(json.user,json.auth_token))
            dispatch(notifierActions.enqueueSnackbar({
                    message: "Email confirmed",
                    options: {
                        variant: 'success',
                    }
                  })
                )
          })
  }
}



export function saveProfile(profile) {
  return function (dispatch) {
    const options = {
      useToken: true,
      action: 'save',
      name: 'ACCOUNT', 
      apiFunction: profileApi.saveProfile,
      args:[profile]
    }    

      return commonActions.callApi(
          dispatch,options).then(json =>{
            commonActions.apiResult(dispatch,profileActionTypes.SAVE_ACCOUNT_SUCCESS, {profile: json.profile} )
            dispatch(loadProfile())
            //dispatch(saveProfileSuccess(json.user))
          })
  }

}


export function saveAvatar(payLoad) {
  return function (dispatch) {
    const options = {
      useToken: true,
      action: 'save',
      name: 'AVATAR', 
      apiFunction: profileApi.saveAvatar,
      args:[payLoad]
    }    

      return commonActions.callApi(
          dispatch,options).then(json =>{
            commonActions.apiResult(dispatch,"SAVE_AVATAR_SUCCESS", {} )
          })
  }

}

export function loadSelfBalance(profile_id) {
    return function (dispatch) {
      const options = {
        useToken: true,
        action: 'load',
        name: 'self_balance', 
        apiFunction: profileApi.loadSelfBalance,
        args:[profile_id]
      }  

      return commonActions.callApi(
            dispatch,options).then(json =>dispatch(loadSelfBalanceSuccess(json.account)))
    }
}

export function loadDistribBalance(profile_id) {
    return function (dispatch) {
      const options = {
        useToken: true,
        action: 'load',
        name: 'distrib_balance', 
        apiFunction: profileApi.loadSelfBalance,
        args:[profile_id]
      }  
        return commonActions.callApi(
            dispatch,options).then(json =>dispatch(loadDistribBalanceSuccess(json.account)))
    }
}


export function recoverPassword(email) {
  return function (dispatch) {
    const options = {
      useToken: true,
      action: 'RECOVER',
      name: 'PASSWORD', 
      apiFunction: profileApi.requestNewPassword,
      args:[email]
    }  

      return commonActions.callApi(
          dispatch,options).then(json =>{
             commonActions.apiResult(dispatch,'PASSWORD_RECOVER',{},()=>{return{user_not_found: true}})
             dispatch(notifierActions.enqueueSnackbar({
                     message: "Recovery email was sent",
                     options: {
                         variant: 'success',
                     }
                   })
                 )  
          })
  }
}

export function sendConfirmEmail(params){
  if (params !==undefined) {
    let email = params.email
    if (email !==undefined){
      return function (dispatch) {
        const options = {
          useToken: false,
          action: 'SEND',
          name: 'CONFIRM_EMAIL', 
          apiFunction: profileApi.sendConfirmEmail,
          args:[email]
        }  

          return commonActions.callApi(
              dispatch,options).then(json =>{
                commonActions.apiResult(dispatch,'CONFIRM_EMAIL_SENT',{},()=>{return{user_not_found: true}})
                dispatch(notifierActions.enqueueSnackbar({
                        message: "Confirm email was sent",
                        options: {
                            variant: 'success',
                        }
                      })
                    )  
              })
      }
    }
  }
}
export function updatePassword(recover_token, password) {
  return function (dispatch) {
    const options = {
      useToken: false,
      action: 'update',
      name: 'PASSWORD', 
      apiFunction: profileApi.submitNewPassword,
      args: [recover_token, password],
    }  

      return commonActions.callApi(
          dispatch,options).then(json =>{
             commonActions.apiResult(dispatch,'UPDATE_PASSWORD',{},()=>{return{user_not_found: true}})
             console.log(json)
             dispatch(notifierActions.enqueueSnackbar({
                     message: "Password updated",
                     options: {
                         variant: 'success',
                     }
                   })
                 )
              localStorage.setItem('auth_token', json.auth_token)
              localStorage.setItem('tenant', json.tenant)
              dispatch({
                type: actionTypes.AUTHENTICATE_SUCCESS,
                token: json.auth_token,
                username:json.email
              })
              dispatch(loadProfile())    
          })
  }
}
function saveProfileSuccess(user){
    return {
        type: profileActionTypes.SAVE_PROFILE_SUCCESS,
        profile: user
    }
}


function profileSuccess(user){
    return {
        type: profileActionTypes.LOAD_PROFILE_SUCCESS,
        ...user
    }
}

function  loadSelfBalanceSuccess(account) {
    return{
        type: profileActionTypes.LOAD_SELF_BALANCE_SUCCESS,
        account: account
    }
}

function  loadDistribBalanceSuccess(account) {
    return{
        type: profileActionTypes.LOAD_DISTRIB_BALANCE_SUCCESS,
        account: account
    }
}


function confirmEmailSuccess(user,token) {
  return{
    type: profileActionTypes.CONFIRM_EMAIL_SUCCESS,
    user,
    token
  }
}
