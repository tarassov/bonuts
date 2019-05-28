import React from 'react';
import * as actionTypes from "./actionTypes"
import  * as commonActions from "actions/commonActions"
import storeApi from "api/storeApi"
import * as modalActions from "actions/modal/modalActions"
import * as modals from 'modals/modalList'
const name = 'STORE'

export function loadStore() {
    return function (dispatch) {
        return commonActions.callApi(
            dispatch,
            storeApi.loadDonuts,
            [],
            "Loading " + name,
            actionTypes.loadFailed(name)).then(json =>{
              let  donuts   = json.donuts
              if (donuts === undefined) {
                donuts = []
              }
              commonActions.apiResult(dispatch,actionTypes.loadSuccess(name), {items:donuts},()=>{return{items: []}})
            })
    }
}

export function addItem(item) {
  return function (dispatch) {
    return commonActions.callApi(
      dispatch,
      storeApi.postItem,
      [item],
      "Saving "+name+" item",
      actionTypes.saveItemFailed(name)).then(json => {
        commonActions.apiResult(dispatch,actionTypes.addSuccess(name),{item: json.donut})
      })
  }
}

export function removeItem(ids){
    return function (dispatch) {
      return modalActions.confirm(dispatch,<div>Remove item?</div>)
      .then(result =>{
        callRemoveItem(dispatch, ids)
      })
      .catch(error => {
        console.log('CANCELED DELETE ' + error)
      })
    }
}

function callRemoveItem(dispatch, ids) {
    ids.forEach((id) =>{
      return commonActions.callApi(
        dispatch,
        storeApi.removeItem,
        [id],
        "Removing  item",
        actionTypes.removeItemFailed(name)).then(json => {
          commonActions.apiResult(dispatch,actionTypes.removeItemSuccess(name), {id:id})
        })
    })
}

export function showItem(id) {
  return function (dispatch) {
      return commonActions.callApi(
          dispatch,
          storeApi.getItem,
          [id],
          "Loading item",
          actionTypes.loadItemFailed(name)).then(json =>{
             commonActions.apiResult(dispatch,actionTypes.loadItemSuccess(name), {item: json.donut})
             if (json.donut !==undefined){
               dispatch(modalActions.showModal(modals.EDIT_STORE_ITEM, json.donut))
             }
          })
  }

}

export function updateItem(item) {
  return function (dispatch) {
      return commonActions.callApi(
          dispatch,
          storeApi.updateItem,
          [item],
          "Saving "+name+" item",
          actionTypes.updateItemFailed(name)).then(json =>{
             commonActions.apiResult(dispatch,actionTypes.updateItemSuccess(name), {item: json.donut} )
          })
  }

}
