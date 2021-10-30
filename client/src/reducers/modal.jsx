import * as actionTypes from "actions/modal/actionTypes";

export default function modal(
  state = { show: false, modalName: null, body: null, value: undefined },
  action
) {
  switch (action.type) {
    case actionTypes.SHOW_MODAL:
      return {
        show: true,
        modalName: action.modalName,
        body: action.body,
      };

    case actionTypes.LOAD_MODAL_OBJECT_SUCCESS:
      return {
        ...state,
        body: action.body,
      };

    case actionTypes.HIDE_MODAL:
      return {
        show: false,
        modalName: null,
        body: null,
      };

    case actionTypes.RESULT_MODAL:
      return {
        ...state,
        result: action.result,
        value: action.value,
      };
    default:
      return state;
  }
}
