
import * as actionTypes from "./actionTypes";
import Storage from "common/storage";
import * as authActions from "./authActions";
import * as notifierActions from "./notifierActions"

export function startLoading(text) {
    return {
        type: actionTypes.START_LOADING,
        text
    }
}
export function endLoading() {
    return {
        type: actionTypes.END_LOADING
    }
}


export function addError(errorText) {
    return {type: actionTypes.ADD_ERROR, errorText}
}



export function callApi(dispatch, apiFunction,args,waitingText, failActionType, useToken = true){
    return new Promise((resolve, reject) =>{
        dispatch(startLoading(waitingText))
        let token = Storage.getToken()
        let apiCall
        if (useToken){
          apiCall =   apiFunction(token,...args)
        }
        else {
          apiCall =   apiFunction(...args)
        }

        apiCall.then(json => {
            if (json.unauthorized) {
                dispatch(authActions.logout())
            }
            if (json.error) {
                dispatch(addError(json.errorText))
                dispatch(notifierActions.enqueueSnackbar({
                          message:  json.errorText,
                          options: {
                              variant: 'error',
                          }
                        })
                      )
                dispatch(apiFail(failActionType,json.errorText))
            }
            else {
                resolve(json)
            }
        }).catch(error => {
          console.log(error)
            dispatch(notifierActions.enqueueSnackbar({
                    message: 'Something went wrong.',
                    options: {
                        variant: 'error',
                    }
                  })
                )
            dispatch(apiFail(failActionType, error))
            reject()
        }).finally(()=>{
            dispatch(endLoading())
        })
    })
}

export function apiFail(type,errorText='', failFunc = (()=>{return{}})){
    return {
        type: type,
        error: true,
        errorText: errorText,
        ...failFunc()
    }
}

export function apiResult(dispatch,type, params, failFunc = (()=>{return{}})) {
    if (type!==undefined && params !== undefined){
      dispatch(apiSuccess(type,params))
    }
    else {
      let errorText = 'Result is empty'
      dispatch(apiFail(type, errorText,failFunc))
      dispatch(notifierActions.enqueueSnackbar({
              message: errorText,
              options: {
                  variant: 'info',
              }
            })
          )
    }
}

function apiSuccess(type,params) {
  if (Array.isArray(params)) {
      return {
      type,
      items: params
    }
  }
  else {
    return {
      type,
      ...params
    }
  }
}
