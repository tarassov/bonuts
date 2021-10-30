import ActionFactory from "actions/actionFactory";
import apis from "api/apiRoot";
import { tenantLogin } from "./authActions";

const acceptCallback = (tenantName) => {
  return {
    success: (dispatch) => {
      console.log("=== REDIRECT ACTION REQUESTED ===");
      dispatch(tenantLogin(tenantName));
    },
  };
};

export function acceptInvitation(id, tenantName) {
  return function (dispatch) {
    console.log("=== acceptInvitation ACTION REQUESTED ===");
    let actions = new ActionFactory(apis.invitations);
    dispatch(
      actions.updateItem({ accept: true, id: id }, acceptCallback(tenantName))
    );
  };
}

export function declineInvitation(id) {
  return function (dispatch) {
    let actions = new ActionFactory(apis.invitations);
    dispatch(actions.updateItem({ decline: true, id: id }));
  };
}
