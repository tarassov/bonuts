import React from "react";
import AppPath from "routes/appPath";
import { settingsPath } from "./settingsPath";
import ShareAllLayout from "layouts/settings/ShareAllLayout";
import { DynamicFeedRounded } from "@material-ui/icons";

export const shareAllPath = new AppPath({
  path: "/share_all",
  anonymous: false,
  authenticated: true,
  sidebarName: "Share all",
  navbarName: "Share all",
  hideInMenu: true,
  admin: true,
  icon: DynamicFeedRounded,
  active: true,
  component: <ShareAllLayout/>,
  settingsRoute: true,
  parent: settingsPath
});
