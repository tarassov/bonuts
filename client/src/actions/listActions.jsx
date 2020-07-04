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

  loadItems(args={}) {
       var loadFunction = function (dispatch) {
          const options = {
            useToken: true,
            action: 'load',
            name:  pluralize.plural(this.api.itemName), 
            apiFunction:   this.api.loadItems, 
            args:[args]
          }
          return commonActions.callApi(
              dispatch,options).then(json =>{
                
                let  items   = json[pluralize.plural(this.nameLower)]
                
                if (items === undefined) {
                  items = []
                }
                if (args.page !==undefined){
                  let pagination = {
                    page:args.page,
                    per_page:json.headers.get('per-page'),
                    total:json.headers.get('total'),
                    request_date:json.headers.get('request_date')
                  }
                  if (args.page ==0 || args.page == 1) {
                    commonActions.apiResult(dispatch,actionTypes.loadSuccess(pluralize.plural(this.nameUpper)), 
                    {items:items,...pagination},
                    ()=>{return{items: []}})

                  }
                  else {
                    commonActions.apiResult(dispatch,actionTypes.addSuccess(pluralize.plural(this.nameUpper)), 
                    {items:items,...pagination},
                    ()=>{return{items: []}})
                  }
                }
                else {
                  commonActions.apiResult(dispatch,actionTypes.loadSuccess(pluralize.plural(this.nameUpper)), {items:items},()=>{return{items: []}})
                }
              })
      }
      return loadFunction.bind(this)
  }


  addItem(item,callback = undefined) {
    var addFunction =  function (dispatch) {
      const options = {
        useToken: true,
        action: 'add',
        name:  this.api.itemName, 
        apiFunction:   this.api.addItem, 
        args:[item]
      }


      return commonActions.callApi(
        dispatch,options).then(json => {
          commonActions.apiResult(dispatch,actionTypes.addSuccess(this.nameUpper),{item: json[this.nameLower]})
          if (callback !==undefined && callback.success !==undefined) {
            callback.success(dispatch)
          }
        })
    }
    return addFunction.bind(this)
  }

  updateItem(item,callback = undefined) {
    var editFunction =  function (dispatch) {
      const options = {
        useToken: true,
        action: 'update',
        name:  this.api.itemName, 
        apiFunction:   this.api.updateItem, 
        args:[item]
      }


      return commonActions.callApi(
        dispatch,options).then(json => {
          commonActions.apiResult(
            dispatch,
            actionTypes.updateSuccess(this.nameUpper),
            {item: json[this.nameLower]}
          )
          if (callback !==undefined && callback.success !==undefined) {
            callback.success(dispatch)
          }
        })
    }
    return editFunction.bind(this)
  }

  commentItem(params,callback){
    var commentFunction =  function (dispatch) {
      const options = {
        useToken: true,
        action: 'comment',
        name:  this.api.itemName, 
        apiFunction:   this.api.commentItem, 
        args:[params.item,params.comment]
      }
      
      return commonActions.callApi(
        dispatch,options).then(json => {
          commonActions.apiResult(
            dispatch,
            actionTypes.updateSuccess(this.nameUpper),
            {item: json[this.nameLower]}
          )
          if (callback !==undefined && callback.success !==undefined) {
            callback.success(dispatch)
          }
        })
    }
    return commentFunction.bind(this)
  }

  deleteItem(item) {
    var deleteFunction =  function (dispatch) {
      const options = {
        useToken: true,
        action: 'delete',
        name:  this.api.itemName, 
        apiFunction:   this.api.updateItem, 
        args:[item]
      }


      return commonActions.callApi(
        dispatch,options).then(json => {
          commonActions.apiResult(
            dispatch,
            actionTypes.deleteSuccess(this.nameUpper),
            {item: json[this.nameLower]}
          )
        })
    }
    return deleteFunction.bind(this)
  }
}

