import * as actionTypes from "./actionTypes";
import * as commonActions from "actions/apiCaller";
import dashboardApi from "api/dashboardApi";

export function loadEvents(page, filter) {
  return function (dispatch) {
    const options = {
      useToken: true,
      action: "load",
      name: "events",
      apiFunction: dashboardApi.loadEvents,
      args: [page, filter],
    };
    return commonActions.callApi(dispatch, options).then((json) => {
      let events = json.events;
      if (events === undefined) {
        events = [];
      }
      if (page === 0 || page === 1) {
        dispatch(
          loadEventsSuccess(
            events,
            page,
            json.headers.get("per-page"),
            json.headers.get("total"),
            json.headers.get("request_date")
          )
        );
      } else {
        dispatch(
          addEventsSuccess(
            events,
            page,
            json.headers.get("per-page"),
            json.headers.get("total"),
            json.headers.get("request_date")
          )
        );
      }
    });
  };
}

export function loadEventWithComments(id, callback) {
  var loadFunction = function (dispatch) {
    const options = {
      useToken: true,
      action: "load",
      name: "EVENT",
      apiFunction: dashboardApi.loadEventWithComment,
      args: [id],
    };

    return commonActions.callApi(dispatch, options).then((json) => {
      commonActions.apiResult(dispatch, actionTypes.updateSuccess("EVENT"), {
        item: json["event"],
      });
      if (callback !== undefined && callback.success !== undefined) {
        callback.success(dispatch);
      }
    });
  };
  return loadFunction.bind(this);
}

export function commentItem(params, callback) {
  var commentFunction = function (dispatch) {
    const options = {
      useToken: true,
      action: "comment",
      name: "EVENT",
      apiFunction: dashboardApi.commentItem,
      args: [params.item, params.comment],
      show_progress: false,
    };

    return commonActions.callApi(dispatch, options).then((json) => {
      commonActions.apiResult(dispatch, actionTypes.updateSuccess("EVENT"), {
        item: json["event"],
      });
      if (callback !== undefined && callback.success !== undefined) {
        callback.success(dispatch);
      }
    });
  };
  return commentFunction.bind(this);
}

export function likeEvent(event) {
  return function (dispatch) {
    const options = {
      useToken: true,
      action: "update",
      name: "event",
      apiFunction: dashboardApi.likeEvent,
      args: [event],
      show_progress: false,
    };
    return commonActions.callApi(dispatch, options).then((json) => {
      commonActions.apiResult(dispatch, actionTypes.updateSuccess("EVENT"), {
        item: json.event,
      });
    });
  };
}

function loadEventsSuccess(events, page, per_page, total, request_date) {
  return {
    type: actionTypes.LOAD_EVENTS_SUCCESS,
    items: events,
    page: page,
    per_page,
    total,
    request_date,
  };
}

function addEventsSuccess(events, page, per_page, total, request_date) {
  return {
    type: actionTypes.ADD_EVENTS_SUCCESS,
    items: events,
    page: page,
    per_page,
    total,
    request_date,
  };
}
