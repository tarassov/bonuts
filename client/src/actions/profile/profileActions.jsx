import * as actionTypes from "actions/profile/actionTypes"
import * as profileActionTypes from "actions/profile/actionTypes"
import profileApi from "api/profileApi"
import  * as commonActions from "actions/commonActions"
import *  as notifierActions from "actions/notifierActions"


export function loadProfile() {
    return function (dispatch) {
        return commonActions.callApi(
            dispatch,
            profileApi.getProfile,
            [],
            "Loading profile",
            actionTypes.LOAD_PROFILE_FAILED).then(json =>{
              commonActions.apiResult(dispatch,'LOAD_PROFILE', json.user,()=>{return{user_not_found: true}})
              dispatch(loadSelfBalance(json.user.self_account.id))
              dispatch(loadDistribBalance(json.user.distrib_account.id))
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
          actionTypes.LOAD_PROFILE_FAILED).then(json =>{
             commonActions.apiResult(dispatch,'LOAD_PROFILE', json.user,()=>{return{user_not_found: true}})
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
          actionTypes.SAVE_PROFILE_FAILED).then(json =>{
            dispatch(saveProfileSuccess(json.user))
          })
  }

}

export function loadSelfBalance(account_id) {
    return function (dispatch) {
      console.log(account_id)
        return commonActions.callApi(
            dispatch,
            profileApi.loadSelfBalance,
            [account_id],
            "Loading self balance",
            actionTypes.LOAD_SELF_BALANCE_FAILED).then(json =>dispatch(loadSelfBalanceSuccess(json.account)))
    }
}

export function loadDistribBalance(account_id) {
    return function (dispatch) {
        return commonActions.callApi(
            dispatch,
            profileApi.loadDistribBalance,
            [account_id],
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
