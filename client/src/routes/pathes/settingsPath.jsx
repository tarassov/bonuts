import React from "react";
import AppPath from "routes/appPath";
import Settings from "@material-ui/icons/Settings";
import SettingsMenuPage from "layouts/settings/SettingsMenuLayout";

export const settingsPath = new AppPath({
  path: "/settings",
  anonymous: false,
  authenticated: true,
  sidebarName: "Settings",
  navbarName: "Settings",
  admin: true,
  icon: Settings,
  active: true,
  store_admin: true,
  component: <SettingsMenuPage/>,
});
