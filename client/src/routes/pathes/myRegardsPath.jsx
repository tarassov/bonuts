import React from "react";
import AppPath from "routes/appPath";
import Stars from "@material-ui/icons/Stars";
import RegardsPage from "containers/pages/RegardsPage";

export const myReagrdsPath = new AppPath({
  path: "/my",
  anonymous: false,
  authenticated: true,
  sidebarName: "My regards",
  navbarName: "My regards",
  icon: Stars,
  active: true,
  component: <RegardsPage/>,
});
