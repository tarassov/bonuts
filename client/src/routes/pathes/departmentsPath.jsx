import React from "react";
import AppPath from "routes/appPath";
import DepartmentsPage from "containers/pages/DepartmentsPage";
import List from "@material-ui/icons/List";

export const departmentsPath = new AppPath({
  path: "/departments",
  anonymous: false,
  authenticated: true,
  sidebarName: "Departments",
  navbarName: "Departments",
  icon: List,
  active: true,
  admin: true,
  component: <DepartmentsPage/>,
});
