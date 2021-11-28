import * as actionTypes from "../actions/actionTypes";

export default function dashboard(state = { profiles: [] }, action) {
  switch (action.type) {
    case actionTypes.LOAD_USERS_SUCCESS:
      return {
        ...state,
        profiles: action.profiles,
      };
    case actionTypes.LOAD_USERS_FAILED:
      return {
        ...state,
        profiles: [],
      };
    case actionTypes.LOG_OUT:
      return {
        profiles: [],
      };

    default:
      return state;
  }
}
