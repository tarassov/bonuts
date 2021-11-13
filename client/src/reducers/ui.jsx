import { REDIRECT } from "actions/ui";
import { LOCATION_CHANGE } from "connected-react-router";

const reducer = (state = { redirected: false,data:undefined, push: false }, action) => {
  switch (action.type) {
    case REDIRECT:
      return {
        redirectTo: action.payload,
        data: action.data,
        push: action.push !==undefined? action.push: false,
        redirected: true,
      };
    case LOCATION_CHANGE:
      return {
        redirectTo: undefined,
        data: undefined,
        push: false,
        redirected: false,
      };
    default:
      return state;
  }
};

export default reducer;
