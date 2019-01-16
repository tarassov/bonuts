import * as actionTypes from "./actionTypes"
import  * as commonActions from "actions/commonActions"
import dashboardApi from "api/dashboardApi"


export function getUsers() {
    return function (dispatch) {
        return commonActions.callApi(
            dispatch,
            dashboardApi.getUsers,
            [],
            "Loading users",
            actionTypes.LOAD_USERS_FAILED).then(json =>{
              dispatch(loadUsersSuccess(json.users))
            })
    }
}


function loadUsersSuccess(users){
  return{
    type: actionTypes.LOAD_USERS_SUCCESS,
    users: users
  }
}
