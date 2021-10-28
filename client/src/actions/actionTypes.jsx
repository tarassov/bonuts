export const AUTHENTICATE = "AUTHENTICATE";

export const AUTHENTICATE_SUCCESS = "AUTHENTICATE_SUCCESS";
export const AUTHENTICATE_CHECKED = "AUTHENTICATE_CHECKED";
export const AUTHENTICATE_FAILED = "AUTHENTICATE_FAILED";
export const AUTHENTICATE_REFRESH = "AUTHENTICATE_REFRESH";
export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";
export const LOG_OUT = "LOG_OUT";
export const REGISTER = "REGISTER";
export const NEW_REGISTER = "NEW_REGISTER";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const TENANT_LOGIN = "TENANT_LOGIN";
export const TENANT_JOIN = "TENANT_JOIN";

export const START_LOADING = "START_LOADING";
export const END_LOADING = "END_LOADING";

export const CLEAR_DATA = "CLEAR_DATA";

export const ADD_ERROR = "ADD_ERROR";
export const REMOVE_ERROR = "REMOVE_ERROR";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export const LOAD_USERS_FAILED = "LOAD_USERS_FAILED";
export const LOAD_USERS_SUCCESS = "LOAD_USERS_SUCCESS";

export const SEND_POINT_SUCCESS = "SEND_POINT_SUCCESS";
export const SEND_POINT_FAILED = "SEND_POINT_FAILED";

export const LOAD_EVENTS_FAILED = "LOAD_EVENTS_FAILED";
export const LOAD_EVENTS_SUCCESS = "LOAD_EVENTS_SUCCESS";
export const ADD_EVENTS_SUCCESS = "ADD_EVENTS_SUCCESS";

export const LOAD_STORE_SUCCESS = "LOAD_STORE_SUCCESS";

export const LOADING_PROFILE = "LOADING_PROFILE";
export const LOAD_PROFILE_SUCCESS = "LOAD_PROFILE_SUCCESS";
export const LOAD_PROFILE_FAILED = "LOAD_PROFILE_FAILED";
export const LOAD_PROFILE_START = "LOAD_PROFILE_START";

export const SAVE_PROFILE_SUCCESS = "SAVE_PROFILE_SUCCESS";
export const SAVE_PROFILE_FAILED = "SAVE_PROFILE_FAILED";

export const LOADING_BALANCE = "LOADING_BALANCE";

export const LOAD_SELF_BALANCE_SUCCESS = "LOAD_SELF_BALANCE_SUCCESS";
export const LOAD_SELF_BALANCE_FAILED = "LOAD_SELF_BALANCE_FAILED";

export const LOAD_DISTRIB_BALANCE_SUCCESS = "LOAD_DISTRIB_BALANCE_SUCCESS";
export const LOAD_DISTRIB_BALANCE_FAILED = "LOAD_DISTRIB_BALANCE_FAILED";

export const CONFIRM_EMAIL_SUCCESS = "CONFIRM_EMAIL_SUCCESS";
export const CONFIRM_EMAIL_FAILED = "CONFIRM_EMAIL_FAILED";

export const PASSWORD_RECOVER_SUCCESS = "PASSWORD_RECOVER_SUCCESS";
export const PASSWORD_RECOVER_FAILED = "PASSWORD_RECOVER_FAILED";

export const UPDATE_PASSWORD_SUCCESS = "UPDATE_PASSWORD_SUCCESS";
export const UPDATE_PASSWORD_FAILED = "UPDATE_PASSWORD_FAILED";

export const LOAD_ACCOUNT_SUCCESS = "LOAD_ACCOUNT_SUCCESS";
export const LOAD_ACCOUNT_FAILED = "LOAD_ACCOUNT_FAILED";

export const SAVE_ACCOUNT_SUCCESS = "SAVE_ACCOUNT_SUCCESS";
export const SAVE_ACCOUNT_FAILED = "SAVE_ACCOUNT_FAILED";

export function loading(name) {
  return "LOADING_" + name.toUpperCase();
}
export function loadSuccess(name) {
  return "LOAD_" + name.toUpperCase() + "_SUCCESS";
}

export function addSuccess(name) {
  return "ADD_" + name.toUpperCase() + "_SUCCESS";
}

export function getSuccess(name) {
  return "GET_" + name.toUpperCase() + "_SUCCESS";
}

export function loadItemSuccess(name) {
  return "LOAD_" + name.toUpperCase() + "ITEM_SUCCESS";
}

export function loadItemFailed(name) {
  return "LOAD_" + name.toUpperCase() + "ITEM_FAILED";
}

export function loadFailed(name) {
  return "LOAD_" + name.toUpperCase() + "_FAILED";
}

export function saveSuccess(name) {
  return "SAVE_" + name.toUpperCase() + "_SUCCESS";
}

export function saveFailed(name) {
  return "SAVE_" + name.toUpperCase() + "_FAILED";
}

export function saveItemSuccess(name) {
  return "SAVE_" + name.toUpperCase() + "ITEM_SUCCESS";
}

export function saveItemFailed(name) {
  return "SAVE_" + name.toUpperCase() + "ITEM_FAILED";
}
export function updateItemSuccess(name) {
  return "UPDATE_" + name.toUpperCase() + "ITEM_SUCCESS";
}

export function updateSuccess(name) {
  return "UPDATE_" + name.toUpperCase() + "_SUCCESS";
}
export function updateItemFailed(name) {
  return "UPDATE_" + name.toUpperCase() + "ITEM_FAILED";
}
export function removeItemSuccess(name) {
  return "REMOVE_" + name.toUpperCase() + "ITEM_SUCCESS";
}

export function deleteSuccess(name) {
  return "DELETE" + name.toUpperCase() + "_SUCCESS";
}

export function removeItemFailed(name) {
  return "REMOVE_" + name.toUpperCase() + "ITEM_FAILED";
}

export function getActionName(action, name, result) {
  let actionName = "";

  if (action !== undefined) {
    actionName = action.toUpperCase();
  }

  if (name !== undefined) {
    actionName = actionName + "_" + name.toUpperCase();
  }

  if (actionName !== "") {
    actionName = actionName + "_" + result.toUpperCase();
  } else {
    actionName = "ACTION_" + result.toUpperCase();
  }

  return actionName;
}
