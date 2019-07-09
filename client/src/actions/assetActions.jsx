import React from 'react';
import * as actionTypes from "./actionTypes"
import  * as commonActions from "actions/commonActions"
import storeApi from "api/storeApi"
import * as modalActions from "actions/modal/modalActions"
import * as modals from 'modals/modalList'
const name = 'ASSET'

export function buyAsset(donut){
    return function(dispatch) {
      const options = {
        useToken: true,
        action: 'add',
        name: name, 
        apiFunction:storeApi.buyAsset,
        args:[donut.id]
      }

      return commonActions.callApi(
        dispatch,options).then(json => {
            commonActions.apiResult(dispatch,actionTypes.addSuccess(name),json.profile_asset)
          })      
    }
 }
  