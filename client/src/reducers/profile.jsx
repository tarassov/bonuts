import * as actionTypes from "actions/profile/actionTypes";
export default function account(state = {loaded: false}, action) {
    switch (action.type) {
      case actionTypes.LOAD_PROFILE_SUCCESS:
          return {
              ...state,
              username: action.profile.name,
              email: action.profile.email,
              fullname: action.fullname,
              loaded: true
          }
      case actionTypes.SAVE_PROFILE_SUCCESS:
          return {
              ...state,
              username: action.profile.name,
              email: action.profile.email,
              fullname: action.fullname,
              loaded: true
          }
        default:
            return state;
    }
}
