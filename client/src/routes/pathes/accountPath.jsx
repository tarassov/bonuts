import React from "react";
import AppPath from "routes/appPath";
import Person from "@material-ui/icons/Person";
import UserPage from "containers/pages/UserPage";

export const accountPath = new AppPath({
  path: "/account",
  anonymous: false,
  authenticated: true,
  sidebarName: "Account",
  navbarName: "Account",
  icon: Person,
  active: true,
  component: <UserPage/>,
  //tenantNotRequired: true
});
