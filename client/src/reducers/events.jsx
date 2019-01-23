import * as actionTypes from "../actions/actionTypes";

export default function dashboard(state = {users: []}, action) {
  switch (action.type) {
      case actionTypes.LOAD_EVENTS_SUCCESS:
        return {
            ...state,
            ...action
        }
    case actionTypes.LOAD_EVENTS_FAILED:
        return {
            ...state,
        }
      case actionTypes.AUTHENTICATE_FAILED:
          return  {

          }
      case actionTypes.LOG_OUT:
          return  {

          }

    default:
        return state
  }
}
