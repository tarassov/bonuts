import * as actionTypes from "./actionTypes";
import AuthenticateApi from "../api/authenticateApi";
import * as commonActions from "./apiCaller";
import { loadProfile } from "./profileActions";
import Storage from "common/storage";
import * as notifierActions from "actions/notifierActions";
import { push } from "redux-first-history";


export function authenticate(email, password, tenant) {
  return do_authenticate(
    AuthenticateApi.authenticate,
    [email, password, tenant],
    false,
    "AUTHENTICATE"
  );
}
export function demo_authenticate() {
  return do_authenticate(
    AuthenticateApi.demo_authenticate,
    [],
    false,
    "AUTHENTICATE"
  );
}
export function refreshToken() {
  return do_authenticate(
    AuthenticateApi.refreshToken,
    [],
    true,
    "REFRESH_TOKEN",
    false
  );
}

function do_authenticate(
  apiFunction,
  args,
  useToken,
  actionName,
  relogin = true
) {
  return function (dispatch) {
    const options = {
      useToken: useToken,
      action: actionName,
      name: undefined,
      apiFunction: apiFunction,
      args: args,
    };
    return commonActions.callApi(dispatch, options).then((json) => {
      Storage.setToken(json.auth_token);
      let currentTenant;
      if (relogin) {
        let currentTenant;
        if (json.currentTenant !== null) {
          currentTenant = json.currentTenant;
        } else if (json.tenants.length === 1) {
          currentTenant = Storage.setTenant(json.tenants[0].name);
        }

        dispatch(
          authenticateSuccess(
            json.auth_token,
            json.email,
            json.tenants,
            currentTenant
          )
        );
        dispatch(loadProfile());
      } else {
        currentTenant = Storage.getTenant();
        if (currentTenant !== null) {
          if (!json.tenants || json.tenants.length === 0) {
            Storage.setTenant(null);
            currentTenant = null;
          } else {
            var tenantsNames = json.tenants.map((tenant) => tenant.name);
            if (!tenantsNames.includes(currentTenant)) {
              Storage.setTenant(null);
              currentTenant = null;
            }
          }
        }
        dispatch({
          type: actionTypes.AUTHENTICATE_REFRESH,
          tenants: json.tenants,
          currentTenant: currentTenant,
          token: json.auth_token,
        });
      }
    });
  };
}

export function tenantJoin(tenantName) {
  return function (dispatch) {
    const options = {
      useToken: true,
      action: "JOIN",
      name: "TENANT",
      apiFunction: AuthenticateApi.join,
      args: [tenantName],
    };
    return commonActions.callApi(dispatch, options).then(() => {
      dispatch(tenantLogin(tenantName));
      dispatch(push("/dashboard"));
    });
  };
}

export function tenantLogin(tenantName) {
  return function (dispatch) {
    var oldTenant = Storage.getTenant();
    Storage.setTenant(tenantName);
    dispatch({
      type: actionTypes.TENANT_LOGIN,
      currentTenant: tenantName,
    });
    if (oldTenant != tenantName) dispatch({ type: actionTypes.CLEAR_DATA });
    dispatch(loadProfile());
    dispatch({type: "READY_TO_REDIRECT"});
    dispatch(push("/dashboard"));
  };
}

export function authenticate_by_url(secret) {
  return function (dispatch) {
    dispatch(commonActions.startLoading("authenticating"));
    return AuthenticateApi.authenticate_by_url(secret)
      .then((json) => {
        Storage.setToken(json.auth_token);
        if (json.auth_token == null) {
          dispatch(authenticateFailed());
        } else {
          dispatch(authenticateSuccess(json.auth_token, null));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(authenticateFailed());
      })
      .finally(() => {
        dispatch(commonActions.endLoading());
      });
  };
}

export function logout() {
  return function (dispatch) {
    Storage.removeItems();
    dispatch(logOutSuccess());
  };
}

export function validateEmail(email) {
  return function () {
    return AuthenticateApi.validateEmail(email).then((res) => {
      console.log(res);
    });
  };
}

export function checkAuth() {
  return function (dispatch) {
    let token = Storage.getToken();
    let currentTenant = Storage.getTenant();
    if (token) {
      dispatch(authenticateChecked(token, currentTenant));
    } else {
      dispatch(authenticateFailed());
    }
  };
}

export function authenticateSuccess(token, username, tenants, currentTenant) {
  return {
    type: actionTypes.AUTHENTICATE_SUCCESS,
    token: token,
    username: username,
    tenants,
    currentTenant,
  };
}

function authenticateChecked(token, currentTenant) {
  return {
    type: actionTypes.AUTHENTICATE_CHECKED,
    token: token,
    currentTenant,
  };
}
function authenticateFailed() {
  return { type: actionTypes.AUTHENTICATE_FAILED };
}

function logOutSuccess() {
  return { type: actionTypes.LOG_OUT };
}

function registerSuccess(user) {
  return {
    type: actionTypes.REGISTER_SUCCESS,
    success: true,
    user: user,
  };
}

function registerFailed() {
  return {
    type: actionTypes.REGISTER_FAILED,
    success: false,
  };
}
export function register(credentials) {
  return function (dispatch) {
    const options = {
      useToken: false,
      action: "register",
      name: "events",
      apiFunction: AuthenticateApi.register,
      args: [credentials],
    };
    return commonActions
      .callApi(dispatch, options)
      .then((json) => {
        let user = json.users[0];
        dispatch(registerSuccess(user));

        dispatch(push('/home'))

        dispatch(
          notifierActions.enqueueSnackbar({
            message: user.name + " ",
            message2: "created",
            options: {
              variant: "success",
            },
          })
        );
        dispatch(
          notifierActions.enqueueSnackbar({
            message: "Please confirm your email",
            options: {
              variant: "info",
            },
          })
        );
        
      })
      .catch((error) => {
        dispatch(
          notifierActions.enqueueSnackbar({
            message: error.message,
            options: {
              variant: "error",
            },
          })
        );
        dispatch(registerFailed());
      });
  };
}
