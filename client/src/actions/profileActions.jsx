import React from 'react';
import * as actionTypes from "actions/actionTypes"
import profileApi from "api/userApi"
import  * as commonActions from "actions/commonActions"
import dashboardApi from 'api/dashboardApi'
import * as modalActions from "actions/modal/modalActions"
import * as modalActionsTypes from "actions/modal/actionTypes"



export function loadProfile() {
  return function (dispatch) {
      return commonActions.callApi(
          dispatch,
          {
            apiFunction: profileApi.getProfile,
            args:[],
            name:"profile",
            action: "load",              
          }).then(json =>{
            var profile = {user_id: json.included.users[0].id, ...json.included.users[0],...json.profile}
          commonActions.apiResult(dispatch,actionTypes.loadSuccess('PROFILE'), {item:profile},()=>{return{user_not_found: true}})
            if (json.profile.self_account!==undefined && json.profile.self_account!==null) dispatch(loadSelfBalance(json.profile.self_account.id))
            if (json.profile.distrib_account!==undefined && json.profile.distrib_account!==null)dispatch(loadDistribBalance(json.profile.distrib_account.id))
          })
  }
}

export function loadAccount() {
  return function (dispatch) {
      const options = {
        useToken: true,
        action: 'load',
        name: 'ACCOUNT', 
        apiFunction:profileApi.getProfile,
        args:[]
      }
      return commonActions.callApi(
          dispatch,options).then(json =>{
            var profile = {...json.included.users[0],...json.profile}
            commonActions.apiResult(dispatch,actionTypes.loadSuccess('ACCOUNT'), {item:profile},()=>{return{user_not_found: true}})
          })
  }
}

export function adminDeposit(profile){
  return function (dispatch) {
    return modalActions.modal(dispatch,<div>Admin deposit</div>,modalActionsTypes.ASK_NUMBER)
    .then(result =>{
      return modalActions.modal(dispatch,<div>Comment</div>,modalActionsTypes.ASK_NUMBER)
      .then(comment =>{
        callAdminDeposit(dispatch, profile,  result.value, comment.value)
      })
      .catch(error => {
        console.log('CANCELED DEPOSIT ' + error)
      })     
    })
    .catch(error => {
      console.log('CANCELED DEPOSIT ' + error)
    })
  }
}

function callAdminDeposit(dispatch, profile, value,comment) {
    const options = {
      useToken: true,
      action: 'add',
      name:  'deposit', 
      apiFunction:   dashboardApi.adminDeposit, 
      args:[ [profile.id], value, comment]
    }
    return commonActions.callApi(
      dispatch,options).then(json => {
        commonActions.apiResult(dispatch,actionTypes.addSuccess('deposit'),{})
      })
}


export function saveProfile(profile) {
  return function (dispatch) {
    const options = {
      useToken: true,
      action: 'save',
      name: 'ACCOUNT', 
      apiFunction: profileApi.saveProfile,
      args:[profile]
    }    

      return commonActions.callApi(
          dispatch,options).then(json =>{
            commonActions.apiResult(dispatch,actionTypes.SAVE_ACCOUNT_SUCCESS, {profile: json.profile} )
            dispatch(loadProfile())
            //dispatch(saveProfileSuccess(json.user))
          })
  }

}


export function saveAvatar(payLoad) {
  return function (dispatch) {
    const options = {
      useToken: true,
      action: 'save',
      name: 'AVATAR', 
      apiFunction: profileApi.saveAvatar,
      args:[payLoad]
    }    

      return commonActions.callApi(
          dispatch,options).then(json =>{
            commonActions.apiResult(dispatch,"SAVE_AVATAR_SUCCESS", {} )
          })
  }

}

export function loadSelfBalance(profile_id) {
    return function (dispatch) {
      const options = {
        useToken: true,
        action: 'load',
        name: 'self_balance', 
        apiFunction: profileApi.loadSelfBalance,
        args:[profile_id]
      }  

      return commonActions.callApi(
            dispatch,options).then(json =>dispatch(loadSelfBalanceSuccess(json.account)))
    }
}

export function loadDistribBalance(profile_id) {
    return function (dispatch) {
      const options = {
        useToken: true,
        action: 'load',
        name: 'distrib_balance', 
        apiFunction: profileApi.loadSelfBalance,
        args:[profile_id]
      }  
        return commonActions.callApi(
            dispatch,options).then(json =>dispatch(loadDistribBalanceSuccess(json.account)))
    }
}



function  loadSelfBalanceSuccess(account) {
    return{
        type: actionTypes.LOAD_SELF_BALANCE_SUCCESS,
        account: account
    }
}

function  loadDistribBalanceSuccess(account) {
    return{
        type: actionTypes.LOAD_DISTRIB_BALANCE_SUCCESS,
        account: account
    }
}

