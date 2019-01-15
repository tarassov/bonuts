import * as actionTypes from "actions/profile/actionTypes"
import * as profileActionTypes from "actions/profile/actionTypes"
import profileApi from "api/profileApi"
import  * as commonActions from "actions/commonActions"



export function loadProfile() {
    return function (dispatch) {
        return commonActions.callApi(
            dispatch,
            profileApi.getProfile,
            [],
            "Loading profile",
            actionTypes.LOAD_PROFILE_FAILED).then(json =>dispatch(profileSuccess(json.user)))
    }
}

export function saveProfile(profile) {
  return function (dispatch) {
      return commonActions.callApi(
          dispatch,
          profileApi.saveProfile,
          [profile],
          "Saving profile]",
          actionTypes.SAVE_PROFILE_FAILED).then(json =>dispatch(saveProfileSuccess(json.user)))
  }

}

export function loadSelfBalance(profile) {
    return function (dispatch) {
        return commonActions.callApi(
            dispatch,
            profileApi.loadSelfBalance,
            [profile],
            "Loading self balance",
            actionTypes.LOAD_SELF_BALANCE_FAILED).then(json =>dispatch(loadSelfBalanceSuccess(json.account)))
    }
}

export function loadDistribBalance(profile) {
    return function (dispatch) {
        return commonActions.callApi(
            dispatch,
            profileApi.loadDistribBalance,
            [profile],
            "Loading distrib balance",
            actionTypes.LOAD_DISTRIB_BALANCE_FAILED).then(json =>dispatch(loadDistribBalanceSuccess(json.account)))
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
        profile: user
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

