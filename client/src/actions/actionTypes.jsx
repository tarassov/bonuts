export const AUTHENTICATE ='AUTHENTICATE'

export const AUTHENTICATE_SUCCESS ='AUTHENTICATE_SUCCESS'
export const AUTHENTICATE_CHECKED ='AUTHENTICATE_CHECKED'
export const AUTHENTICATE_FAILED ='AUTHENTICATE_FAILED'
export const LOG_OUT ='LOG_OUT'
export const REGISTER ='REGISTER'
export const NEW_REGISTER ='NEW_REGISTER'
export const REGISTER_SUCCESS ='REGISTER_SUCCESS'
export const REGISTER_FAILED ='REGISTER_FAILED'


export const START_LOADING = 'START_LOADING'
export const END_LOADING = 'END_LOADING'


export const ADD_ERROR = 'ADD_ERROR'
export const REMOVE_ERROR = 'REMOVE_ERROR'
export const CLEAR_ERRORS = 'CLEAR_ERRORS'


export const LOAD_USERS_FAILED='LOAD_USERS_FAILED'
export const LOAD_USERS_SUCCESS='LOAD_USERS_SUCCESS'


export const SEND_POINT_SUCCESS = 'SEND_POINT_SUCCESS'
export const SEND_POINT_FAILED = 'SEND_POINT_FAILED'



export const LOAD_EVENTS_FAILED='LOAD_EVENTS_FAILED'
export const LOAD_EVENTS_SUCCESS='LOAD_EVENTS_SUCCESS'
export const ADD_EVENTS_SUCCESS ='ADD_EVENTS_SUCCESS'

export const LOAD_STORE_SUCCESS = 'LOAD_STORE_SUCCESS'

export function loading(name) {
  return "LOADING_"+name.toUpperCase()
}
export function loadSuccess(name) {
  return "LOAD_" + name.toUpperCase()+"_SUCCESS"
}

export function addSuccess(name) {
  return "ADD_" + name.toUpperCase()+"_SUCCESS"
}

export function getSuccess(name) {
  return "GET_" + name.toUpperCase()+"_SUCCESS"
}

export function loadItemSuccess(name) {
  return "LOAD_"+  name.toUpperCase()+"ITEM_SUCCESS"
}

export function loadItemFailed(name) {
  return "LOAD_"+  name.toUpperCase()+"ITEM_FAILED"
}

export function loadFailed(name) {
  return "LOAD_" + name.toUpperCase()+"_FAILED"
}

export function saveSuccess(name) {
  return "SAVE_"+ name.toUpperCase()+"_SUCCESS"
}

export function saveFailed(name) {
  return "SAVE_"+ name.toUpperCase()+"_FAILED"
}

export function saveItemSuccess(name) {
  return "SAVE_"+ name.toUpperCase()+"ITEM_SUCCESS"
}

export function saveItemFailed(name) {
  return "SAVE_"+ name.toUpperCase()+"ITEM_FAILED"
}
export function updateItemSuccess(name) {
  return "UPDATE_"+ name.toUpperCase()+"ITEM_SUCCESS"
}

export function updateSuccess(name) {
  return "UPDATE_"+ name.toUpperCase()+"_SUCCESS"
}
export function updateItemFailed(name) {
  return "UPDATE_"+ name.toUpperCase()+"ITEM_FAILED"
}
export function removeItemSuccess(name) {
  return "REMOVE_"+ name.toUpperCase()+"ITEM_SUCCESS"
}

export function deleteSuccess(name) {
  return "DELETE"+ name.toUpperCase()+"_SUCCESS"
}

export function removeItemFailed(name) {
  return "REMOVE_"+ name.toUpperCase()+"ITEM_FAILED"
}

export function getActionName(action,name,result){
  let actionName = ''

  if (action !== undefined){
      actionName = action.toUpperCase()      
  }

  
  if (name !== undefined){
    actionName = actionName +'_'+ name.toUpperCase()
  }

  if (actionName!=='' ) {
      actionName=actionName +'_'+result.toUpperCase() 
  }
  else{
      actionName= 'ACTION_'+result.toUpperCase()       
  }

  return actionName
 
}