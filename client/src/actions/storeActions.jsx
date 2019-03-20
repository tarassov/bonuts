import * as actionTypes from "./actionTypes"
import  * as commonActions from "actions/commonActions"
import storeApi from "api/storeApi"

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
        commonActions.apiResult(dispatch,actionTypes.saveItemSuccess(name),json.item)
      })
  }
}
