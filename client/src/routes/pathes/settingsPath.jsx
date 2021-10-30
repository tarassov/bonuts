import AppPath from "routes/appPath";
import Settings from "@material-ui/icons/Settings";
import SettingsPage from "containers/pages/SettingsPage";

export const settingsPath = new AppPath({
  path: "/settings",
  anonymous: false,
  authenticated: true,
  sidebarName: "Settings",
  navbarName: "Settings",
  admin: true,
  icon: Settings,
  active: true,
  component: SettingsPage,
});
