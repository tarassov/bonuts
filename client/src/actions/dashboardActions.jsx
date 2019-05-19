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
              var i = -1

              var profiles  = json.profiles.map(profile=>{
                i++
                console.log(profile)
                console.log({user_id: json.included.users[i].id,...json.included.users[i],id: profile.id, ...profile})
                return {user_id: json.included.users[i].id,...json.included.users[i],id: profile.id, ...profile}

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
                let  events   = json.events
                if (events === undefined) {
                  events = []
                }
                console.log(events)
                if (page ==0 || page == 1) {
                  dispatch(loadEventsSuccess(events,page,
                      json.headers.get('per-page'),
                      json.headers.get('total'),
                      json.headers.get('request_date')
                  ))
                }
                else {
                  dispatch(addEventsSuccess(events,page,
                      json.headers.get('per-page'),
                      json.headers.get('total'),
                      json.headers.get('request_date')
                  ))
                }
        })
    }
}


export function sendPoints(amount, from_profile_id, profile_ids,comment, is_for_distrib) {
  console.log('send points')
  console.log(from_profile_id)
  return function(dispatch) {

    return commonActions.callApi(
      dispatch,
      dashboardApi.sendPoints,
      [amount, from_profile_id, profile_ids,comment,is_for_distrib],
      "Sending points",
      actionTypes.SEND_POINT_FAILED).then(json => {
        dispatch(sendPointsSuccess())
        if (from_profile_id !==null){
          dispatch(profileActions.loadProfile())
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
