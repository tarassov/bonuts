import React from "react";
import AppPath from "routes/appPath";
import Store from "@material-ui/icons/Store";
import StorePage from "layouts/settings/AdminStoreLayout";
import { settingsPath } from "./settingsPath";

export const storePath = new AppPath({
  path: "/store",
  anonymous: false,
  authenticated: true,
  sidebarName: "Store",
  navbarName: "Store",
  hideInMenu: true,
  admin: true,
  store_admin: true,
  icon: Store,
  active: true,
  component: <StorePage/>,
  settingsRoute: true,
  parent: settingsPath
});
