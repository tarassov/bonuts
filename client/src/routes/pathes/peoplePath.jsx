import React from "react";
import AppPath from "routes/appPath";
import PeoplePage from "containers/pages/ProfilesPage";
import ProfilesLayout from "layouts/profiles/ProfilesLayout";
import People from "@material-ui/icons/People";

export const peoplePath = new AppPath({
  path: "/people",
  anonymous: false,
  authenticated: true,
  sidebarName: "People",
  navbarName: "People",
  icon: People,
  active: true,
  admin: false,
  component: <ProfilesLayout/>,
});
