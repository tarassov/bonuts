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
              commonActions.apiResult(dispatch,actionTypes.loadSuccess(name), donuts,()=>{return{items: []}})
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
        commonActions.apiResult(dispatch,actionTypes.addSuccess(name),json.donut)
      })
  }
}

export function removeItem(id){
    return function (dispatch) {
      return modalActions.confirm(dispatch,<div>Remove item?</div>)
      .then(result =>{
        console.log(result)
      })
    }
}

export function showItem(id) {
  return function (dispatch) {
      return commonActions.callApi(
          dispatch,
          storeApi.getItem,
          [id],
          "Loading item",
          actionTypes.loadItemFailed(name)).then(json =>{
             commonActions.apiResult(dispatch,actionTypes.loadItemSuccess(name), json.donut )
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
             commonActions.apiResult(dispatch,actionTypes.updateItemSuccess(name), json.donut )
          })
  }

}
