import React from 'react';
import * as actionTypes from "./actionTypes"
import  * as commonActions from "actions/commonActions"
import storeApi from "api/storeApi"
import * as modalActions from "actions/modal/modalActions"
import * as modals from 'modals/modalList'
const name = 'ASSET'

export function buyAsset(donutId){
    return function(dispatch) {
      return commonActions.callApi(
        dispatch,
        storeApi.buyAsset,
        [donutId],
        "Creating " +name,
        actionTypes.saveItemFailed(name)).then(json => {
            commonActions.apiResult(dispatch,actionTypes.addSuccess(name),json.profile_asset)
          })      
    }
 }
  