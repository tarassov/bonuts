import * as actionTypes from "actions/actionTypes";
export default function errors(state = { list: [] }, action) {
  switch (action.type) {
    case actionTypes.ADD_ERROR:
      return {
        ...state,
        list: [...state.list, action.errorText],
        activeError: true,
      };

    case actionTypes.REMOVE_ERROR:
      return {
        ...state.filter((error, i) => i !== action.index),
      };

    case actionTypes.CLEAR_ERRORS:
      return {
        list: [],
      };

    
    default:
      return state;
  }
}
