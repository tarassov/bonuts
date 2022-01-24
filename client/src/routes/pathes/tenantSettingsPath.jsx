import React from "react";
import AppPath from "routes/appPath";
import Icon from "@material-ui/icons/SupervisorAccount";
import TenantSettingsLayout from "layouts/settings/TenantSettingsLayout";
import { settingsPath } from "./settingsPath";

export const tenantSettingsPath = new AppPath({
  path: "/tenant",
  anonymous: false,
  authenticated: true,
  sidebarName: "Team settings",
  navbarName: "Team settings",
  hideInMenu: true,
  admin: true,
  icon: Icon,
  active: true,
  component: <TenantSettingsLayout/>,
  settingsRoute: true,
  parent: settingsPath
});
