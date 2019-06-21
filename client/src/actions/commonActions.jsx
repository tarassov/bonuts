
import * as actionTypes from "./actionTypes";
import Storage from "common/storage";
import * as authActions from "./authActions";
import * as notifierActions from "./notifierActions"
import pluralize from 'pluralize'
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




export function callApi(dispatch, input_options){
//apiFunction,args,name, failActionType, useToken = true){
    const default_options = {
        useToken: true,
        action: 'load',
        name: '', 
        apiFunction: undefined, 
        args:[]
    }

    const options = {...default_options, ...input_options}

    let startActionName =  actionTypes.getActionName(options.action,options.name,'start') 
    let endActionName = actionTypes.getActionName(options.action,options.name,'end')
    let failActionName =  actionTypes.getActionName(options.action,options.name,'failed')

    if (options.apiFunction===undefined) {
        throw new Error('apiFunction is not defined')
    }

    return new Promise((resolve, reject) =>{
        dispatch(startLoading('Loading ' + options.name))
        dispatch({type: startActionName})

        let token = Storage.getToken()
        let apiCall
        if (options.useToken){
          apiCall =   options.apiFunction(token,...options.args)
        }
        else {
          apiCall =   options.apiFunction(...options.args)
        }

        apiCall.then(json => {
            if (json.unauthorized) {
                dispatch(authActions.logout())
            }
            if (json.error) {
                console.log(json)
                dispatch(addError(json.errorText))
                dispatch(notifierActions.enqueueSnackbar({
                          message:  json.errorText,
                          options: {
                              variant: 'error',
                          }
                        })
                      )
                dispatch(apiFail(failActionName,json.errorText))
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
            dispatch(apiFail(failActionName, error))
            reject()
        }).finally(()=>{
            dispatch(endLoading())
            dispatch({type: endActionName})
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
  return {
      type,
      ...params
    }
}
