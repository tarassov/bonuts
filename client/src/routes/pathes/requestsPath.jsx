import React from "react";
import AppPath from "routes/appPath";
import Input from "@material-ui/icons/Input";
import RequestsPage from "containers/pages/RequestsPage";
import IncomingRequestsLayout from "layouts/requests/IncomingRequestsLayout";

export const requestsPath = new AppPath({
  path: "/requests",
  anonymous: false,
  authenticated: true,
  sidebarName: "Requests",
  navbarName: "Requests",
  icon: Input,
  active: true,
  store_admin: true,
  component: <IncomingRequestsLayout/>,
});
