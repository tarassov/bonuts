import * as actionTypes from "actions/profile/actionTypes";
import * as types from "actions/actionTypes"
export default function profile(state = {loaded: false, self_balance: 0, distrib_balance: 0,tenant: {}}, action) {
    switch (action.type) {
      case actionTypes.LOAD_PROFILE_SUCCESS:
          return {
              ...state,
              ...action.item,
              user_not_found: action.user_not_found,
              loaded: true
          }
      case actionTypes.LOAD_PROFILE_FAILED:
        return{
              ...state,
              user_not_found: action.user_not_found,
        }
      case actionTypes.SAVE_PROFILE_SUCCESS:
          console.log(action)
          return {
              ...state,
              ...action.profile,
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
        case types.loadSuccess("CURRENT_TENANT"):
            return{
                ...state,
                tenant_loaded: true,
                tenant: action.tenant,
            }    
        case types.loadFailed("CURRENT_TENANT"):
                return{
                    ...state,
                    tenant:{},
                    tenant_loaded: false,
                }  
        default:
            return state;
    }
}
