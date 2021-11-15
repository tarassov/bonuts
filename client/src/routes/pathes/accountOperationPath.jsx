import React from "react";
import AppPath from "routes/appPath";
import AccountOperationsPage from "containers/pages/AccountOperationsPage";

export const accountOperationPath = new AppPath({
  path: "/account/:id",
  anonymous: false,
  authenticated: true,
  active: true,
  hideInMenu: true,
  sidebarName: "AccountOperationsPage",
  navbarName: "AccountOperationsPage",
  component: <AccountOperationsPage/>,
});
