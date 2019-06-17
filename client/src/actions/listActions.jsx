import React from 'react';
import * as actionTypes from "./actionTypes"
import  * as commonActions from "actions/commonActions"
import apis from "api/apiRoot"
import * as modalActions from "actions/modal/modalActions"
import * as modals from 'modals/modalList'
import pluralize from 'pluralize'

export default class ListActions {
  constructor(api) {
    this.nameUpper = api.itemName.toUpperCase()
    this.nameLower = api.itemName.toLowerCase()
    this.api = api
  }

  loadItems() {
       var addFunction = function (dispatch) {
          return commonActions.callApi(
              dispatch,
              this.api.loadItems,
              [],
              "Loading " + this.nameLower,
              actionTypes.loadFailed(pluralize.plural(this.nameUpper))).then(json =>{
                
                let  items   = json[pluralize.plural(this.nameLower)]
                
                if (items === undefined) {
                  items = []
                }
                commonActions.apiResult(dispatch,actionTypes.loadSuccess(pluralize.plural(this.nameUpper)), {items:items},()=>{return{items: []}})
              })
      }
      return addFunction.bind(this)
  }


  addItem(api, item) {
    return function (dispatch) {
      return commonActions.callApi(
        dispatch,
        api.postItem,
        [item],
        "Saving "+this.nameLower+" item",
        actionTypes.saveItemFailed(this.nameUpper)).then(json => {
          commonActions.apiResult(dispatch,actionTypes.addSuccess(this.nameUpper),{item: json[this.nameLower]})
        })
    }
  }
}

