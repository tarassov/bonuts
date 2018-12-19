import * as actionTypes from "actions/account/actionTypes";
export default function account(state = {loaded: false}, action) {
    switch (action.type) {
      case actionTypes.LOAD_ACCOUNT_SUCCESS:
          return {
              ...state,
              username: action.account.name,
              secret_url: action.account.secret_url,
              email: action.account.email,
              fullname: action.fullname,
              loaded: true
          }
      case actionTypes.SAVE_ACCOUNT_SUCCESS:
          return {
              ...state,
              username: action.account.name,
              secret_url: action.account.secret_url,
              email: action.account.email,
              fullname: action.fullname,
              loaded: true
          }
        default:
            return state;
    }
}
