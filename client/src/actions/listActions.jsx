import React from 'react';
import * as actionTypes from "./actionTypes"
import  * as commonActions from "actions/commonActions"
import apis from "api/apiRoot"
import * as modalActions from "actions/modal/modalActions"
import * as modals from 'modals/modalList'
import pluralize from 'pluralize'

export function loadItems(api) {
    let nameUpper = api.itemName.toUpperCase()
    let nameLower = api.itemName.toLowerCase()
    return function (dispatch) {
        return commonActions.callApi(
            dispatch,
            api.loadItems,
            [],
            "Loading " + nameLower,
            actionTypes.loadFailed(pluralize.plural(nameUpper))).then(json =>{
              
              let  items   = json[pluralize.plural(nameLower)]
              
              if (items === undefined) {
                items = []
              }
              commonActions.apiResult(dispatch,actionTypes.loadSuccess(pluralize.plural(nameUpper)), {items:items},()=>{return{items: []}})
            })
    }
}


