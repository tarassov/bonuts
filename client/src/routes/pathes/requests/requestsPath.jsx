import React from "react";
import AppPath from "routes/appPath";
import Input from "@material-ui/icons/Input";
import RequestsMenuLayout from "layouts/requests/RequestsMenuLayout";

export const requestsPath = new AppPath({
  path: "/requests",
  anonymous: false,
  authenticated: true,
  sidebarName: "Requests",
  navbarName: "Requests",
  icon: Input,
  active: true,
  store_admin: true,
  admin: true,
  component: <RequestsMenuLayout/>,
});
