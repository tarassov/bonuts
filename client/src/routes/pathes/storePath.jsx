import AppPath from "routes/appPath";
import Settings from "@material-ui/icons/Settings";
import StorePage from "containers/pages/StorePage";

export const storePath = new AppPath({
  path: "/store",
  anonymous: false,
  authenticated: true,
  sidebarName: "Store",
  navbarName: "Store",
  hideInMenu: true,
  admin: true,
  icon: Settings,
  active: true,
  component: StorePage,
  settingsRoute: true,
});
