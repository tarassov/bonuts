import * as actionTypes from "../actions/actionTypes";
export default function authenticate(
  state = { authenticated: false, tenants: [] },
  action
) {
  switch (action.type) {
    case actionTypes.AUTHENTICATE_SUCCESS:
      return {
        ...state,
        authenticated: true,
        username: action.username,
        token: action.token,
        tenants: action.tenants,
        currentTenant:
          state.currentTenant !== undefined &&
          action.tenants.includes(state.currentTenant)
            ? state.currentTenant
            : action.currentTenant,
      };
    case actionTypes.AUTHENTICATE_REFRESH:
      return {
        ...state,
        token: action.token,
        tenants: action.tenants,
        currentTenant: action.currentTenant,
      };
    case actionTypes.TENANT_LOGIN:
      return {
        ...state,
        currentTenant: action.currentTenant,
      };
    case actionTypes.AUTHENTICATE_CHECKED:
      return {
        ...state,
        authenticated: true,
        token: action.token,
        currentTenant: action.currentTenant,
      };

    case actionTypes.AUTHENTICATE_FAILED:
      return {
        authenticated: false,
        token: null,
        tenants: null,
        currentTenant: null,
      };
    case actionTypes.LOG_OUT:
      return {
        authenticated: false,
        username: null,
        token: null,
        tenants: null,
        currentTenant: null,
      };
    case actionTypes.REGISTER_SUCCESS:
      return {
        authenticated: false,
        confirmed: false,
        registered: true,
        email: action.user.email,
      };

    case actionTypes.REGISTER_FAILED:
      return {
        authenticated: false,
        registered: false,
        email: null,
      };
    case actionTypes.NEW_REGISTER:
      return {
        authenticated: false,
        registered: false,
        confirmed: false,
        email: null,
      };

    default:
      return state;
  }
}
