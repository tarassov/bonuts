import React from "react";
import AppPath from "routes/appPath";
import NewPasswordLayout from "layouts/NewPasswordLayout";

export const recoverPasswordPath = new AppPath({
  path: "/recover_password/:token",
  anonymous: true,
  authenticated: true,
  root: true,
  active: true,
  hideInMenu: true,
  sidebarName: "RecoverPassword",
  navbarName: "RecoverPassword",
  component: <NewPasswordLayout/>,
});
