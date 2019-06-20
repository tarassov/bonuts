import * as actionTypes from "actions/profile/actionTypes"
import * as actions from "actions/actionTypes"
import * as profileActionTypes from "actions/profile/actionTypes"
import profileApi from "api/profileApi"
import  * as commonActions from "actions/commonActions"
import *  as notifierActions from "actions/notifierActions"


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
      return commonActions.callApi(
          dispatch,
          profileApi.getProfile,
          [],
          "account",
          actions.loadFailed('ACCOUNT')).then(json =>{
            var profile = {user_id: json.included.users[0].id, ...json.included.users[0],...json.profile}

          commonActions.apiResult(dispatch,actions.loadSuccess('ACCOUNT'), {item:profile},()=>{return{user_not_found: true}})

          })
  }
}


export function loadByToken(token){
  return function (dispatch) {
      return commonActions.callApi(
          dispatch,
          profileApi.getByToken,
          [token],
          "Loading profile",
          actions.loadFailed('PROFILE')).then(json =>{
             commonActions.apiResult(dispatch,actions.loadSuccess('PROFILE'), {item:json.user},()=>{return{user_not_found: true}})
          })
  }
}

export function loadByRecoverToken(token){
  return function (dispatch) {
      return commonActions.callApi(
          dispatch,
          profileApi.getByRecoverToken,
          [token],
          "Loading profile",
          actions.loadFailed('PROFILE')).then(json =>{
             commonActions.apiResult(dispatch,actions.loadSuccess('PROFILE'), {item:json.user},()=>{return{user_not_found: true}})
          })
  }
}


export function confirmEmail(token){
  return function (dispatch) {
      return commonActions.callApi(
          dispatch,
          profileApi.confirmEmail,
          [token],
          "Confirming email",
          profileActionTypes.CONFIRM_EMAIL_FAILED).then(json =>{
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
      return commonActions.callApi(
          dispatch,
          profileApi.saveProfile,
          [profile],
          "Saving profile]",
          actionTypes.SAVE_ACCOUNT_FAILED).then(json =>{
            commonActions.apiResult(dispatch,profileActionTypes.SAVE_ACCOUNT_SUCCESS, {profile: json.profile} )
            //dispatch(saveProfileSuccess(json.user))
          })
  }

}

export function loadSelfBalance(profile_id) {
    return function (dispatch) {
      return commonActions.callApi(
            dispatch,
            profileApi.loadSelfBalance,
            [profile_id],
            "Loading self balance",
            actionTypes.LOAD_SELF_BALANCE_FAILED).then(json =>dispatch(loadSelfBalanceSuccess(json.account)))
    }
}

export function loadDistribBalance(profile_id) {
    return function (dispatch) {
        return commonActions.callApi(
            dispatch,
            profileApi.loadDistribBalance,
            [profile_id],
            "Loading distrib balance",
            actionTypes.LOAD_DISTRIB_BALANCE_FAILED).then(json =>dispatch(loadDistribBalanceSuccess(json.account)))
    }
}


export function recoverPassword(email) {
  return function (dispatch) {
      return commonActions.callApi(
          dispatch,
          profileApi.requestNewPassword,
          [email],
          "Requesting password reset",
          actionTypes.PASSWORD_RECOVER_FAILED).then(json =>{
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
export function updatePassword(recover_token, password) {
  return function (dispatch) {
      return commonActions.callApi(
          dispatch,
          profileApi.submitNewPassword,
          [recover_token, password],
          "Requesting password reset",
          actionTypes.UPDATE_PASSWORD_FAILED).then(json =>{
             commonActions.apiResult(dispatch,'UPDATE_PASSWORD',{},()=>{return{user_not_found: true}})
             dispatch(notifierActions.enqueueSnackbar({
                     message: "Password updated",
                     options: {
                         variant: 'success',
                     }
                   })
                 )
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
