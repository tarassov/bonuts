import * as actionTypes from "./actionTypes"
import  * as commonActions from "actions/commonActions"
import dashboardApi from "api/dashboardApi"
import * as  profileActions from  "actions/profile/profileActions"


export function loadUsers() {
    return function (dispatch) {
        return commonActions.callApi(
            dispatch,
            dashboardApi.loadUsers,
            [],
            "Loading users",
            actionTypes.LOAD_USERS_FAILED).then(json =>{
              dispatch(loadUsersSuccess(json.users))
            })
    }
}

export function sendPoints(amount, from_account_id, to_account_id) {
  return function(dispatch) {
    return commonActions.callApi(
      dispatch,
      dashboardApi.sendPoints,
      [amount, from_account_id, to_account_id],
      "Sending points",
      actionTypes.SEND_POINT_FAILED).then(json => {
        dispatch(sendPointsSuccess())
        dispatch(profileActions.loadDistribBalance(from_account_id))        
      })
  }
}


function loadUsersSuccess(users){
  return{
    type: actionTypes.LOAD_USERS_SUCCESS,
    users: users
  }
}

function sendPointsSuccess () {
  return {
    type: actionTypes.SEND_POINT_SUCCESS
  }
}
