import * as actionTypes from "../actions/actionTypes";

export default function system(
  state = {
    waitingText: null,
    isWaiting: false,
  },
  action
) {
  switch (action.type) {
    case actionTypes.START_LOADING:
      return {
        ...state,
        waitingText: action.text,
        isWaiting: true,
      };
    case actionTypes.END_LOADING:
      return {
        ...state,
        waitingText: null,
        isWaiting: false,
      };

    default:
      return state;
  }
}
