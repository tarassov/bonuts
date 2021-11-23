import React from "react";
import AppPath from "routes/appPath";
import Icon from "@material-ui/icons/SupervisorAccount";
import TenantSettingsLayout from "layouts/settings/TenantSettingsLayout";

export const tenantSettingsPath = new AppPath({
  path: "/tenant",
  anonymous: false,
  authenticated: true,
  sidebarName: "Tenant",
  navbarName: "Tenant",
  hideInMenu: true,
  admin: true,
  icon: Icon,
  active: true,
  component: <TenantSettingsLayout/>,
  settingsRoute: true,
});
