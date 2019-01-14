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
            "Loading account",
            actionTypes.LOAD_PROFILE_FAILED).then(json =>dispatch(profileSuccess(json.user)))
    }
}

export function saveAccount(account) {
  return function (dispatch) {
      return commonActions.callApi(
          dispatch,
          profileApi.saveProfile,
          [account],
          "Saving p[rofile]",
          actionTypes.SAVE_PROFILE_FAILED).then(json =>dispatch(saveProfileSuccess(json.user)))
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
