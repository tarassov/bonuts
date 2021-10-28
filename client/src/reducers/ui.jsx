import { REDIRECT } from "actions/ui";
import { LOCATION_CHANGE } from "connected-react-router";

const reducer = (state = { redirected: false }, action) => {
  switch (action.type) {
    case REDIRECT:
      return {
        redirectTo: action.payload,
        redirected: true,
      };
    case LOCATION_CHANGE:
      return {
        redirectTo: undefined,
        redirected: false,
      };
    default:
      return state;
  }
};

export default reducer;
