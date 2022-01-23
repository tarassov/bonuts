import React from "react";
import AppPath from "routes/appPath";
import Input from "@material-ui/icons/Input";
import { requestsPath } from "./requestsPath";
import ActiveRequestsLayout from "layouts/requests/ActiveRequestsLayout";

export const incomingRequestsPath = new AppPath({
  path: "/active_requests",
  anonymous: false,
  authenticated: true,
  sidebarName: "Active requests",
  navbarName: "Active requests",
  hideInMenu: true,
  icon: Input,
  active: true,
  store_admin: true,
  parent: requestsPath,
  component: <ActiveRequestsLayout/>,
});
