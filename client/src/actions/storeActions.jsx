import React from 'react';
import * as actionTypes from "./actionTypes"
import  * as commonActions from "actions/commonActions"
import storeApi from "api/storeApi"
import * as modalActions from "actions/modal/modalActions"
import * as modals from 'modals/modalList'
import pluralize from 'pluralize'


const name = 'STORE'


export function loadStore() {
    return function (dispatch) {
        const options = {
          useToken: true,
          action: 'load',
          name:  name, 
          apiFunction:   storeApi.loadDonuts, 
          args:[]
        }
        return commonActions.callApi(
            dispatch,options).then(json =>{
              let  donuts   = json.donuts
              if (donuts === undefined) {
                donuts = []
              }
              commonActions.apiResult(dispatch,actionTypes.loadSuccess(pluralize.plural(name)), {items:donuts},()=>{return{items: []}})
            })
    }
}

export function addItem(item) {
  return function (dispatch) {
    const options = {
      useToken: true,
      action: 'add',
      name:  name, 
      apiFunction:   storeApi.postItem, 
      args:[item]
    }
    return commonActions.callApi(
      dispatch,options).then(json => {
        commonActions.apiResult(dispatch,actionTypes.addSuccess(name),{item: json.donut})
      })
  }
}

export function removeItem(items){
    return function (dispatch) {
      return modalActions.confirm(dispatch,<div>Remove item?</div>)
      .then(result =>{
        callRemoveItem(dispatch, items)
      })
      .catch(error => {
        console.log('CANCELED DELETE ' + error)
      })
    }
}

function callRemoveItem(dispatch, items) {
  items.forEach((item) =>{
      const options = {
        useToken: true,
        action: 'remove',
        name: name, 
        apiFunction: storeApi.removeItem, 
        args:[item.id]
      }

      return commonActions.callApi(
        dispatch,options).then(json => {
          commonActions.apiResult(dispatch,actionTypes.deleteSuccess(name), {item})
        })
    })
}

export function showItem(id) {
  return function (dispatch) {
    const options = {
      useToken: true,
      action: 'load',
      name: name, 
      apiFunction: storeApi.getItem, 
      args:[id]
    }

      return commonActions.callApi(
          dispatch,options).then(json =>{
             commonActions.apiResult(dispatch,actionTypes.loadItemSuccess(name), {item: json.donut})
             if (json.donut !==undefined){
               dispatch(modalActions.showModal(modals.EDIT_STORE_ITEM, json.donut))
             }
          })
  }

}

export function updateItem(item) {
  return function (dispatch) {

    const options = {
      useToken: true,
      action: 'update',
      name: name, 
      apiFunction: storeApi.updateItem, 
      args:[item]
    }
      return commonActions.callApi(
          dispatch,options).then(json =>{
             commonActions.apiResult(dispatch,actionTypes.updateSuccess(name), {item: json.donut} )
          })
  }

}
