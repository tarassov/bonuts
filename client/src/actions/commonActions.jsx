
import * as actionTypes from "./actionTypes";
import Storage from "../common/storage";
import * as authActions from "./authActions";

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
            else if (json.error) {
                dispatch(addError(json.errorText))
                dispatch(apiFail(failActionType,json.errorText))
            }
            else {
                resolve(json)
            }
        }).catch(error => {
            console.log(error)
            dispatch(apiFail(failActionType, error))
            reject
        }).finally(()=>{
            dispatch(endLoading())
        })
    })
}

function apiFail(type,errorText=''){
    return {
        type: type,
        error: true,
        errorText: errorText
    }
}
