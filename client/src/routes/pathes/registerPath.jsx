import React from "react";
import AppPath from "routes/appPath";
import Person from "@material-ui/icons/Person";
import RegisterPage from "containers/pages/RegisterPage";

export const registerPath = new AppPath({
  path: "/register",
  anonymous: true,
  authenticated: false,
  sidebarName: "Register",
  navbarName: "Register",
  icon: Person,
  active: true,
  component: <RegisterPage/>,
});
