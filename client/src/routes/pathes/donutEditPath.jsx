import React from "react";
import AppPath from "routes/appPath";
import DonutEditPage from "layouts/donuts/DonutEditLayout";

export const donutEditPath = new AppPath({
  path: "/donut/:id",
  anonymous: false,
  authenticated: true,
  active: true,
  hideInMenu: true,
  component: <DonutEditPage/>,
});
