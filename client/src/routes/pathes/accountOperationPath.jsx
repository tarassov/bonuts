import React from "react";
import AppPath from "routes/appPath";
import AccountOperations from "layouts/AccountOperations";

export const accountOperationPath = new AppPath({
  path: "/account/:id",
  anonymous: false,
  authenticated: true,
  active: true,
  hideInMenu: true,
  sidebarName: "AccountOperationsPage",
  navbarName: "AccountOperationsPage",
  component: <AccountOperations/>,
});
