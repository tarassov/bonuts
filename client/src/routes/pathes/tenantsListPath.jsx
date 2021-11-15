import React from "react";
import AppPath from "routes/appPath";
import HomeWork from "@material-ui/icons/HomeWork";
import TenantsListPage from "containers/pages/TenantsListPage";

export const tenantsListPath = new AppPath({
  path: "/tenants_list",
  anonymous: false,
  authenticated: true,
  sidebarName: "My spaces",
  navbarName: "My spaces",
  icon: HomeWork,
  active: true,
  component: <TenantsListPage/>,
  tenantNotRequired: true,
});
