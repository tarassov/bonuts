import React from "react";
import * as actionTypes from "./actionTypes";
import * as apiCaller from "actions/apiCaller";
import storeApi from "api/listApi/storeApi";
import * as modalActions from "actions/modal/modalActions";
import * as modalActionsTypes from "actions/modal/actionTypes";
import * as modals from "modals/modalList";
import pluralize from "pluralize";


const name = "STORE";

export function loadStore(all = false) {
  return function (dispatch) {
    const options = {
      useToken: true,
      action: "load",
      name: name,
      apiFunction: storeApi.loadDounts,
      args: [all],
    };
    return apiCaller.callApi(dispatch, options).then((json) => {
      let donuts = json.donuts;
      if (donuts === undefined) {
        donuts = [];
      }
      apiCaller.apiResult(
        dispatch,
        actionTypes.loadSuccess(pluralize.plural(name)),
        { items: donuts },
        () => {
          return { items: [] };
        }
      );
    });
  };
}

export function addItem(item) {
  return function (dispatch) {
    const options = {
      useToken: true,
      action: "add",
      name: name,
      apiFunction: storeApi.postItem,
      args: [item],
    };
    return apiCaller.callApi(dispatch, options).then((json) => {
      console.log(json)
      apiCaller.apiResult(dispatch, actionTypes.addSuccess(name), {
        item: json.donuts[0],
      });
    });
  };
}

export function removeItem(items) {
  return function (dispatch) {
    return modalActions
      .modal(
        dispatch,
        <div>Remove item?</div>,
        modalActionsTypes.CONFIRM_DIALOG
      )
      .then(() => {
        callRemoveItem(dispatch, items);
      })
      .catch((error) => {
        console.log("CANCELED DELETE " + error);
      });
  };
}

function callRemoveItem(dispatch, items) {
  items.forEach((item) => {
    const options = {
      useToken: true,
      action: "remove",
      name: name,
      apiFunction: storeApi.removeItem,
      args: [item.id],
    };

    return apiCaller.callApi(dispatch, options).then(() => {
      apiCaller.apiResult(dispatch, actionTypes.deleteSuccess(name), {
        item,
      });
    });
  });
}

export function showItem(id) {
  return function (dispatch) {
    const options = {
      useToken: true,
      action: "load",
      name: name,
      apiFunction: storeApi.getItem,
      args: [id],
    };

    return apiCaller.callApi(dispatch, options).then((json) => {
      apiCaller.apiResult(dispatch, actionTypes.loadItemSuccess(name), {
        item: json.donut,
      });
      if (json.donut !== undefined) {
        dispatch(modalActions.showModal(modals.EDIT_STORE_ITEM, json.donut));        
      }
    });
  };
}

export function updateItem(item) {
  return function (dispatch) {
    const options = {
      useToken: true,
      action: "update",
      name: name,
      apiFunction: storeApi.updateItem,
      args: [item],
    };
    return apiCaller.callApi(dispatch, options).then((json) => {
      apiCaller.apiResult(dispatch, actionTypes.updateSuccess(name), {
        item: json.donut,
      });
    });
  };
}
