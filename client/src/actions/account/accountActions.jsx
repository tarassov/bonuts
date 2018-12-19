import * as actionTypes from "actions/account/actionTypes"
import * as accountActionTypes from "actions/account/actionTypes"
import accountApi from "api/accountApi"
import  * as commonActions from "actions/commonActions"



export function loadAccount() {
    return function (dispatch) {
        return commonActions.callApi(
            dispatch,
            accountApi.getAccount,
            [],
            "Loading account",
            actionTypes.LOAD_ACCOUNT_FAILED).then(json =>dispatch(accountSuccess(json.user)))
    }
}

export function saveAccount(account) {
  return function (dispatch) {
      return commonActions.callApi(
          dispatch,
          accountApi.saveAccount,
          [account],
          "Saving account",
          actionTypes.SAVE_ACCOUNT_FAILED).then(json =>dispatch(saveAccountSuccess(json.user)))
  }

}

function saveAccountSuccess(user){
    return {
        type: accountActionTypes.SAVE_ACCOUNT_SUCCESS,
        account: user
    }
}


function accountSuccess(user){
    return {
        type: accountActionTypes.LOAD_ACCOUNT_SUCCESS,
        account: user
    }
}
