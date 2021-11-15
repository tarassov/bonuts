import React from "react";
import AppPath from "routes/appPath";
import CreatePage from "containers/pages/CreateDonutPage";

export const createDonutPath = new AppPath({
  path: "/donut_wizard",
  anonymous: false,
  authenticated: true,
  active: true,
  component: <CreatePage/>,
});
