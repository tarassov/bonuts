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
              var i = 0

              var profiles  = json.profiles.map(profile=>{
                return {user_id: json.included.users[0].id, ...json.included.users[0], ...profile}
              })
              dispatch(loadUsersSuccess(profiles))
            })
    }
}


export function loadEvents(page) {
    return function (dispatch) {
        return commonActions.callApi(
            dispatch,
            dashboardApi.loadEvents,
            [page],
            "Loading users",
            actionTypes.LOAD_EVENTS_FAILED).then(json =>{
                if (page ==0 || page == 1) {
                  dispatch(loadEventsSuccess(json.events,page,
                      json.headers.get('per-page'),
                      json.headers.get('total'),
                      json.headers.get('request_date')
                  ))
                }
                else {
                  dispatch(addEventsSuccess(json.events,page,
                      json.headers.get('per-page'),
                      json.headers.get('total'),
                      json.headers.get('request_date')
                  ))
                }
        })
    }
}


export function sendPoints(amount, from_account_id, to_user_ids,comment) {
  return function(dispatch) {
    return commonActions.callApi(
      dispatch,
      dashboardApi.sendPoints,
      [amount, from_account_id, to_user_ids,comment],
      "Sending points",
      actionTypes.SEND_POINT_FAILED).then(json => {
        dispatch(sendPointsSuccess())
        if (from_account_id !==null){
          dispatch(profileActions.loadDistribBalance(from_account_id))
        }
        dispatch(loadEvents(1))
      })
  }
}


function loadUsersSuccess(profiles){
  return{
    type: actionTypes.LOAD_USERS_SUCCESS,
    profiles: profiles
  }
}

function loadEventsSuccess(events,page,per_page,total, request_date){
    return{
        type: actionTypes.LOAD_EVENTS_SUCCESS,
        items: events,
        page: page,
        per_page,
        total,
        request_date
    }
}

function addEventsSuccess(events,page,per_page,total, request_date){
    return{
        type: actionTypes.ADD_EVENTS_SUCCESS,
        items: events,
        page: page,
        per_page,
        total,
        request_date
    }
}

function sendPointsSuccess () {
  return {
    type: actionTypes.SEND_POINT_SUCCESS
  }
}
