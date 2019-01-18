import * as actionTypes from "../actions/actionTypes";

export default function dashboard(state = {users: []}, action) {
    switch (action.type) {
      case actionTypes.LOAD_USERS_SUCCESS:
      return {
          ...state,
          users: action.users
      }
      case actionTypes.LOAD_USERS_FAILED:
      return {
          ...state,
          users: []
      }

        default:
            return state
    }
}
