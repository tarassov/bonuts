import React from "react";
import AppPath from "routes/appPath";
import Schedule from "@material-ui/icons/Schedule";
import SchedulersLayout from "layouts/settings/SchedulersLayout";
import { settingsPath } from "./settingsPath";

export const schedulersPath = new AppPath({
  path: "/schedulers",
  anonymous: false,
  authenticated: true,
  sidebarName: "Schedulers",
  navbarName: "Schedulers",
  hideInMenu: true,
  store_admin: true,
  admin: true,
  icon: Schedule,
  active: true,
  component: <SchedulersLayout/>,
  settingsRoute: true,
  parent: settingsPath
});
