import * as actionTypes from "actions/actionTypes";
export default function profile(
  state = {
    loaded: false,
    loading: false,
    self_balance: 0,
    admin: false,
    store_admin:false,
    distrib_balance: 0,
    tenant: {},
  },
  action
) {
  switch (action.type) {
    case actionTypes.LOAD_PROFILE_SUCCESS:
      return {
        ...state,
        ...action.item,
        failed: false,
        loading: false,
        user_not_found: action.user_not_found,
        loaded: true,
      };
    case actionTypes.LOAD_PROFILE_START:
      return {
        ...state,
        failed: false,
        loading: true,
        user_not_found: action.user_not_found,
      };
    case actionTypes.LOAD_PROFILE_FAILED:
      return {
        ...state,
        failed: true,
        loading: false,
        loaded: false,
        user_not_found: action.user_not_found,
      };
    case actionTypes.SAVE_PROFILE_SUCCESS:
      console.log(action);
      return {
        ...state,
        ...action.profile,
        failed: false,
        loaded: true,
      };
    case actionTypes.LOAD_SELF_BALANCE_SUCCESS:
      return {
        ...state,
        lastSelfOperation: action.account.last_operation,
        self_balance: action.account.balance,
      };
    case actionTypes.CONFIRM_EMAIL_SUCCESS:
      return {
        ...state,
        confirmed: true,
      };
    case actionTypes.CONFIRM_EMAIL_FAILED:
      return {
        ...state,
        confirmed: false,
      };
    case actionTypes.LOAD_SELF_BALANCE_FAILED:
      return {
        ...state,
        lastSelfOperation: null,
        self_balance: 0,
      };
    case actionTypes.LOAD_DISTRIB_BALANCE_SUCCESS:
      return {
        ...state,
        lastDistribOperation: action.account.last_operation,
        distrib_balance: action.account.balance,
      };
    case actionTypes.LOAD_DISTRIB_BALANCE_FAILED:
      return {
        ...state,
        lastDistribOperation: null,
        distrib_balance: 0,
      };
    case actionTypes.loadSuccess("CURRENT_TENANT"):
      return {
        ...state,
        tenant_loaded: true,
        tenant: action.tenant,
      };
    case actionTypes.loadFailed("CURRENT_TENANT"):
      return {
        ...state,
        tenant: {},
        tenant_loaded: false,
      };
    default:
      return state;
  }
}
