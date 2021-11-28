import React from "react";
import DashboardPage from "containers/pages/DashboardPage";
import Dashboard from "@material-ui/icons/Dashboard";
import AppPath from "routes/appPath";

export const dashboardPath = new AppPath({
  path: "/dashboard",
  authenticated: true,
  anonymous: false,
  sidebarName: "Dashboard",
  navbarName: "Dashboard",
  icon: Dashboard,
  hideInMenu: false,
  active: true,
  component: <DashboardPage/>,
});
