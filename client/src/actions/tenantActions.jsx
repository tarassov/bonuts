import * as actionTypes from "actions/actionTypes"
import * as actions from "actions/actionTypes"
import  * as commonActions from "actions/commonActions"
import *  as notifierActions from "actions/notifierActions"
import tenantApi from 'api/tenantApi'



export function migrateAvatars(domain){
  return function(dispatch){
        const options = {
        useToken: true,
        action: 'migrate',
        name: 'avatars', 
        apiFunction:tenantApi.migrateAvatars,
        args:[]
        }

        return commonActions.callApi(dispatch,options).then(json=>{
        commonActions.apiResult(dispatch,"MIGRATE_SUCCESS",{})
        dispatch(notifierActions.enqueueSnackbar({
            message: "migrated",
            options: {
                variant: 'success',
            }
        }))
        })
    }
}

export function loadTenant() {
  return function (dispatch) {
      return commonActions.callApi(
          dispatch,
          {
            apiFunction: tenantApi.showTenant,
            args:[],
            name:"tenant",
            action: "load",              
          }).then(json =>{
            let  items   = json["tenants"]               
            if (items === undefined) {
              items = []
            }
          commonActions.apiResult(dispatch,actions.loadSuccess('TENANT'), {item:items},()=>{return{user_not_found: true}})

          })
  }
}


export function saveLogo(payLoad) {
    return function (dispatch) {
      const options = {
        useToken: true,
        action: 'save',
        name: 'logo', 
        apiFunction: tenantApi.saveLogo,
        args:[payLoad]
      }    
  
        return commonActions.callApi(
            dispatch,options).then(json =>{
              commonActions.apiResult(dispatch,"SAVE_LOGO_SUCCESS", {} )
              dispatch(notifierActions.enqueueSnackbar({
                message: "saved",
                options: {
                    variant: 'success',
                }
            }))
            })
    }
  
  }
