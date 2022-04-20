import React from "react";
import AppPath from "routes/appPath";
import Input from "@material-ui/icons/Input";
import IncomingRequestsLayout from "layouts/requests/IncomingRequestsLayout";
import { requestsPath } from "./requestsPath";
import { InputRounded } from "@material-ui/icons";

export const incomingRequestsPath = new AppPath({
  path: "/incoming_requests",
  anonymous: false,
  authenticated: true,
  sidebarName: "Incoming requests",
  navbarName: "Incoming requests",
  hideInMenu: true,
  icon: InputRounded,
  active: true,
  store_admin: true,
  admin: true,
  parent: requestsPath,
  component: <IncomingRequestsLayout/>,
});
