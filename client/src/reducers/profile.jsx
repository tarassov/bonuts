import * as actionTypes from "actions/profile/actionTypes";
export default function profile(state = {loaded: false, self_balance: 0, distrib_balance: 0}, action) {
    switch (action.type) {
      case actionTypes.LOAD_PROFILE_SUCCESS:
          return {
              ...state,
              username: action.name,
              email: action.email,
              fullname: action.fullname,
              last_name: action.last_name,
              first_name: action.first_name,
              sex: action.sex,
              self_account: action.self_account,
              distrib_account: action.distrib_account,
              id: action.id,
              user_not_found: action.user_not_found,
              loaded: true
          }
      case actionTypes.LOAD_PROFILE_FAILED:
        return{
              ...state,
              user_not_found: action.user_not_found,
        }
      case actionTypes.SAVE_PROFILE_SUCCESS:
          return {
              ...state,
              username: action.profile.name,
              email: action.profile.email,
              fullname: action.fullname,
              last_name: action.last_name,
              first_name: action.first_name,
              sex: action.sex,
              loaded: true
          }
        case  actionTypes.LOAD_SELF_BALANCE_SUCCESS:
            return{
                ...state,
                self_balance: action.account.balance
            }
        case actionTypes.CONFIRM_EMAIL_SUCCESS:
            return    {
              ...state,
              confirmed: true
            }
        case actionTypes.CONFIRM_EMAIL_FAILED:
            return    {
              ...state,
              confirmed: false
            }
        case  actionTypes.LOAD_SELF_BALANCE_FAILED:
            return{
                ...state,
                self_balance:0
            }
        case  actionTypes.LOAD_DISTRIB_BALANCE_SUCCESS:
            return{
                ...state,
                distrib_balance: action.account.balance
            }
        case  actionTypes.LOAD_DISTRIB_BALANCE_FAILED:
            return{
                ...state,
                distrib_balance:0
            }
        default:
            return state;
    }
}
