import * as actions from "actions/actionTypes";
import * as commonActions from "actions/apiCaller";
import * as notifierActions from "actions/notifierActions";
import tenantApi from "api/tenantAdminApi";

export function loadTenant() {
  return function (dispatch) {
    return commonActions
      .callApi(dispatch, {
        apiFunction: tenantApi.showTenant,
        args: [],
        name: "tenant",
        action: "load",
      })
      .then((json) => {
        let tenant = json["tenant"];
        commonActions.apiResult(
          dispatch,
          actions.loadSuccess("CURRENT_TENANT"),
          { tenant },
          () => {
            return { user_not_found: true };
          }
        );
      });
  };
}

export function saveTenant(tenant) {
  return function (dispatch) {
    const options = {
      useToken: true,
      action: "save",
      name: "CURRENT_TENANT",
      apiFunction: tenantApi.saveTenant,
      args: [tenant],
    };

    return commonActions.callApi(dispatch, options).then((json) => {
      let tenant = json["tenant"];
      commonActions.apiResult(
        dispatch,
        actions.saveItemSuccess("CURRENT_TENANT"),
        { tenant },
        () => {
          return { user_not_found: true };
        }
      );
      dispatch(loadTenant());
    });
  };
}

export function saveLogo(payLoad) {
  return function (dispatch) {
    const options = {
      useToken: true,
      action: "save",
      name: "logo",
      apiFunction: tenantApi.saveLogo,
      args: [payLoad],
    };

    return commonActions.callApi(dispatch, options).then(() => {
      commonActions.apiResult(dispatch, "SAVE_LOGO_SUCCESS", {});
      dispatch(
        notifierActions.enqueueSnackbar({
          message: "saved",
          options: {
            variant: "success",
          },
        })
      );
    });
  };
}
