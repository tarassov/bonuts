
import * as actionTypes from "./actionTypes"
import  * as commonActions from "actions/commonActions"
import storeApi from "api/storeApi"
import * as notifierActions from "./notifierActions"
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
            commonActions.apiResult(dispatch,actionTypes.addSuccess(name),json.regard)
            dispatch(notifierActions.enqueueSnackbar({
              message: "You have successfully bought a new donut",
              message2: "  '" +json.regard.donut_name +"'",              
              options: {
                  variant: 'success',
              }
            })
            )
          })      
    }
 }
  