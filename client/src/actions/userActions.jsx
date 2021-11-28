import * as actionTypes from "actions/actionTypes";
import profileApi from "api/userApi";
import * as commonActions from "actions/apiCaller";
import * as notifierActions from "actions/notifierActions";
import { push } from "redux-first-history";
import { authenticateSuccess, checkAuth } from "actions/authActions";

export function loadByRecoverToken(token) {
  return function (dispatch) {
    const options = {
      useToken: true,
      action: "load",
      name: "PROFILE",
      apiFunction: profileApi.getByRecoverToken,
      args: [token],
    };
    return commonActions.callApi(dispatch, options).then((json) => {
      commonActions.apiResult(
        dispatch,
        actionTypes.loadSuccess("PROFILE"),
        { item: json.user },
        () => {
          return { user_not_found: true };
        }
      );
    });
  };
}

export function confirmEmail(token) {
  return function (dispatch) {
    const options = {
      useToken: false,
      action: "confirm",
      name: "email",
      apiFunction: profileApi.confirmEmail,
      args: [token],
    };

    return commonActions.callApi(dispatch, options).then((json) => {
      console.log(json);
      dispatch(confirmEmailSuccess(json.user, json.auth_token));
      localStorage.setItem("auth_token", json.auth_token);
      dispatch(checkAuth());
      dispatch(
        notifierActions.enqueueSnackbar({
          message: "Email confirmed",
          options: {
            variant: "success",
          },
        })
      );
    });
  };
}

export function loadByToken(token) {
  return function (dispatch) {
    const options = {
      useToken: true,
      action: "load",
      name: "PROFILE",
      apiFunction: profileApi.getByToken,
      args: [token],
    };

    return commonActions.callApi(dispatch, options).then((json) => {
      commonActions.apiResult(
        dispatch,
        actionTypes.loadSuccess("PROFILE"),
        { item: json.user },
        () => {
          return { user_not_found: true };
        }
      );
    });
  };
}

export function recoverPassword(email) {
  return function (dispatch) {
    const options = {
      useToken: true,
      action: "RECOVER",
      name: "PASSWORD",
      apiFunction: profileApi.requestNewPassword,
      args: [email],
    };

    return commonActions.callApi(dispatch, options).then(() => {
      commonActions.apiResult(dispatch, "PASSWORD_RECOVER", {}, () => {
        return { user_not_found: true };
      });
      dispatch(
        notifierActions.enqueueSnackbar({
          message: "Recovery email was sent",
          options: {
            variant: "success",
          },
        })
      );
    });
  };
}

export function sendConfirmEmail(params) {
  if (params !== undefined) {
    let email = params.email;
    if (email !== undefined) {
      return function (dispatch) {
        const options = {
          useToken: false,
          action: "SEND",
          name: "CONFIRM_EMAIL",
          apiFunction: profileApi.sendConfirmEmail,
          args: [email],
        };

        return commonActions.callApi(dispatch, options).then(() => {
          commonActions.apiResult(dispatch, "CONFIRM_EMAIL_SENT", {}, () => {
            return { user_not_found: true };
          });
          dispatch(
            notifierActions.enqueueSnackbar({
              message: "Confirm email was sent",
              options: {
                variant: "success",
              },
            })
          );
        });
      };
    }
  }
}
export function updatePassword(recover_token, password) {
  return function (dispatch) {
    const options = {
      useToken: false,
      action: "update",
      name: "PASSWORD",
      apiFunction: profileApi.submitNewPassword,
      args: [recover_token, password],
    };

    return commonActions.callApi(dispatch, options).then((json) => {
      commonActions.apiResult(dispatch, "UPDATE_PASSWORD", {}, () => {
        return { user_not_found: true };
      });
      console.log(json);
      dispatch(
        notifierActions.enqueueSnackbar({
          message: "Password updated",
          options: {
            variant: "success",
          },
        })
      );
      localStorage.setItem("auth_token", json.auth_token);
      localStorage.setItem("tenant", json.tenant);
      dispatch(
        authenticateSuccess(
          json.auth_token,
          json.email,
          json.tenants,
          json.tenant
        )
      );
      dispatch(push("/"));
    });
  };
}

function confirmEmailSuccess(user, token) {
  return {
    type: actionTypes.CONFIRM_EMAIL_SUCCESS,
    user,
    token,
  };
}
