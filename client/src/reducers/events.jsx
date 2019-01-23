import * as actionTypes from "../actions/actionTypes";

export default function dashboard(state = {items: [], page:0}, action) {
  switch (action.type) {
      case actionTypes.LOAD_EVENTS_SUCCESS:
        return {
            ...state,
            ...action
        }
    case actionTypes.ADD_EVENTS_SUCCESS:
     return {
       ...state,
       ...action,
       items: [...state.items, ...action.items]
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
