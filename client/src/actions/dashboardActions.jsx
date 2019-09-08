import * as actionTypes from "./actionTypes"
import  * as commonActions from "actions/commonActions"
import dashboardApi from "api/dashboardApi"
import * as  profileActions from  "actions/profile/profileActions"
import {loadEvents} from 'actions/eventActions'

export function loadUsers() {
    return function (dispatch) {
        const options = {
          useToken: true,
          action: 'load',
          name: 'users', 
          apiFunction: dashboardApi.loadUsers, 
          args:[],
        }

        return commonActions.callApi(
            dispatch,options).then(json =>{
              var i = -1

              var profiles  = json.profiles.map(profile=>{
                i++
                //console.log(profile)
                //console.log({user_id: json.included.users[i].id,...json.included.users[i],id: profile.id, ...profile})
                return {user_id: json.included.users[i].id,...json.included.users[i],id: profile.id, ...profile}

              })
              dispatch(loadUsersSuccess(profiles))
            })
    }
}




export function sendPoints(amount, from_profile_id, profile_ids,comment, is_for_distrib, share_for_all, burn_old) {
  return function(dispatch) {
    const options = {
      useToken: true,
      action: 'send',
      name: 'point', 
      apiFunction:   dashboardApi.sendPoints, 
      args:[amount, from_profile_id, profile_ids,comment,is_for_distrib,share_for_all, burn_old],
    }
    return commonActions.callApi(
      dispatch,options).then(json => {
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


function sendPointsSuccess () {
  return {
    type: actionTypes.SEND_POINT_SUCCESS
  }
}
