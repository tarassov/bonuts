import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import errors from "./errors";
import authenticate from "./authenticate";
import dashboard from "./dashboard";
import system from "./system";
import profile from "./profile";
import account from "./account";
import modal from "./modal";
import notifier from "./notifier";
import ui from "./ui";
import loader from "./loader";
import { connectRouter } from "connected-react-router";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    errors,
    authenticate,
    dashboard,
    system,
    profile,
    account,
    modal,
    notifier,
    ui,
    events: createReducer(loader, "EVENT"),
    store: createReducer(loader, "STORE"),
    regards: createReducer(loader, "REGARD"),
    requests: createReducer(loader, "REQUEST"),
    departments: createReducer(loader, "DEPARTMENT"),
    profiles: createReducer(loader, "PROFILE"),
    donuts: createReducer(loader, "DONUT"),
    account_operations: createReducer(loader, "ACCOUNT_OPERATION"),
    schedulers: createReducer(loader, "SCHEDULER"),
    plugins: createReducer(loader, "PLUGIN"),
    tenants: createReducer(loader, "TENANTS"),
    accessible_tenants: createReducer(loader, "ACCESSIBLE_TENANTS"),
    invitations: createReducer(loader, "INVITATIONS"),
    form: formReducer,
  });

export default rootReducer;

function createReducer(reducerFunction, name) {
  return (state, action) => {
    return reducerFunction(state, action, name);
  };
}
