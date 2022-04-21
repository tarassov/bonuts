import React from "react";
import AppPath from "routes/appPath";
import Input from "@material-ui/icons/Input";
import { requestsPath } from "./requestsPath";
import ActiveRequestsLayout from "layouts/requests/ActiveRequestsLayout";
import {CompareArrowsRounded } from "@material-ui/icons";

export const activeRequestsPath = new AppPath({
  path: "/active_requests",
  anonymous: false,
  authenticated: true,
  sidebarName: "Accepted requests",
  navbarName: "Accepted requests",
  hideInMenu: true,
  icon: CompareArrowsRounded,
  active: true,
  store_admin: true,
  admin: true,
  parent: requestsPath,
  component: <ActiveRequestsLayout/>,
});
