import * as actionTypes from "actions/modal/actionTypes";
import { subscribe } from "redux-subscriber";
import * as modalResults from "actions/modal/modalResults";

export function showModal(modalName, body) {
  return {
    type: actionTypes.SHOW_MODAL,
    modalName: modalName,
    body: body,
  };
}

export function hideModal() {
  console.log("HIDE_MODAL");
  return {
    type: actionTypes.HIDE_MODAL,
  };
}

export function modal(dispatch, body, modalName) {
  if (modalName === undefined) modalName = actionTypes.CONFIRM_DIALOG;
  return new Promise((resolve, reject) => {
    const unsubscribe = subscribe("modal.result", (state) => {
      if (state.modal.result !== undefined) {
        unsubscribe();
        if (
          state.modal.result === modalResults.CANCEL ||
          state.modal.result === modalResults.EMPTY
        ) {
          reject(state.modal.result);
        } else {
          resolve({ status: state.modal.result, value: state.modal.value });
        }
      }
    });

    dispatch(showModal(modalName, body));
  });
}

export function resultModal(result, value) {
  return {
    type: actionTypes.RESULT_MODAL,
    result: result,
    value: value,
  };
}
