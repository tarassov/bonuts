import React from "react";
import LocationOn from "@material-ui/icons/LocationOn";
import HomePage from "containers/pages/HomePage";
import AppPath from "routes/appPath";

export const homePath = new AppPath({
  path: "/home",
  anonymous: true,
  authenticated: false,
  sidebarName: "Home",
  navbarName: "Home",
  icon: LocationOn,
  hideInMenu: true,
  component: <HomePage/>,
});
