import * as actions from "actions/actionTypes";
export default function profile(
  state = { loaded: false, isLoading: false, data: { loaded: true } },
  action
) {
  switch (action.type) {
    case actions.LOAD_ACCOUNT_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.item,
          user_not_found: action.user_not_found,
          loaded: true,
        },
      };
    case actions.LOAD_ACCOUNT_FAILED:
      return {
        ...state,
        user_not_found: action.user_not_found,
        loaded: false,
      };
    case actions.SAVE_ACCOUNT_SUCCESS:
      console.log(action);
      return {
        ...state,
        data: {
          ...state.data,
          ...action.profile,
          user_not_found: action.user_not_found,
          loaded: true,
        },
      };
    case actions.CLEAR_DATA:
      return { loaded: false, isLoading: false, data: { loaded: true } };

    case actions.getActionName("load", "account", "start"):
      return {
        ...state,
        isLoading: true,
      };
    case actions.getActionName("load", "account", "end"):
      return {
        ...state,
        isLoading: false,
      };
    case actions.getActionName("save", "account", "start"):
      return {
        ...state,
        isLoading: true,
      };
    case actions.getActionName("save", "account", "end"):
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
