import React from "react";
import AppPath from "routes/appPath";
import Stars from "@material-ui/icons/Stars";
import MyRequests from "layouts/MyRequests";

export const myRequestsPath = new AppPath({
  path: "/my",
  anonymous: false,
  authenticated: true,
  sidebarName: "My Requests",
  navbarName: "My Requests",
  icon: Stars,
  active: true,
  component: <MyRequests/>,
});
