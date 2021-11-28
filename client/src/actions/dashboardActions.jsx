import * as actionTypes from "./actionTypes";
import * as commonActions from "actions/apiCaller";
import dashboardApi from "api/dashboardApi";
import * as profileActions from "actions/profileActions";
import { loadEvents } from "actions/eventActions";

export function loadUsers() {
  return function (dispatch) {
    const options = {
      useToken: true,
      action: "load",
      name: "users",
      apiFunction: dashboardApi.loadUsers,
      args: [],
    };

    return commonActions.callApi(dispatch, options).then((json) => {
      var profiles = json.profiles.map((profile) => {
        return { id: profile.id, ...profile };
      });
      dispatch(loadUsersSuccess(profiles));
    });
  };
}

export function sendPoints(
  amount,
  from_profile_id,
  profile_ids,
  comment,
  is_for_distrib,
  share_for_all,
  burn_old,
  to_self_account
) {
  return function (dispatch) {
    const options = {
      useToken: true,
      action: "send",
      name: "point",
      apiFunction: dashboardApi.sendPoints,
      args: [
        amount,
        from_profile_id,
        profile_ids,
        comment,
        is_for_distrib,
        share_for_all,
        burn_old,
        to_self_account,
      ],
    };
    return commonActions.callApi(dispatch, options).then(() => {
      dispatch(sendPointsSuccess());
      if (from_profile_id !== null) {
        dispatch(profileActions.loadProfile());
      }
      dispatch(loadEvents(1));
    });
  };
}

function loadUsersSuccess(profiles) {
  return {
    type: actionTypes.LOAD_USERS_SUCCESS,
    profiles: profiles,
  };
}

function sendPointsSuccess() {
  return {
    type: actionTypes.SEND_POINT_SUCCESS,
  };
}
