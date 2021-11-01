import AppPath from "routes/appPath";
import Settings from "@material-ui/icons/Settings";
import SettingsMenuPage from "containers/pages/SettingsMenuPage";

export const settingsPath = new AppPath({
  path: "/settings",
  anonymous: false,
  authenticated: true,
  sidebarName: "Settings",
  navbarName: "Settings",
  admin: true,
  icon: Settings,
  active: true,
  component: SettingsMenuPage,
});
