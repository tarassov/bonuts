import React from "react";
import AppPath from "routes/appPath";
import DonutPreviewLayout from "layouts/donuts/DonutPreviewLayout";

export const   donutPreviewPath
= new AppPath({
  path: "/d/:id",
  anonymous: false,
  authenticated: true,
  active: true,
  hideInMenu: true,
  component: <DonutPreviewLayout/>,
});
