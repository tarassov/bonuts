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
