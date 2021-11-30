import React from "react";
import AppPath from "routes/appPath";
import EventPage from "layouts/EventLayout";

export const eventPath = new AppPath({
  path: "/event/:id",
  anonymous: false,
  authenticated: true,
  active: true,
  hideInMenu: true,
  component: <EventPage/>,
});
