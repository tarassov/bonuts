import AppPath from "routes/appPath";
import Store from "@material-ui/icons/Store";
import StorePage from "containers/pages/StorePage";

export const storePath = new AppPath({
  path: "/store",
  anonymous: false,
  authenticated: true,
  sidebarName: "Store",
  navbarName: "Store",
  hideInMenu: true,
  admin: true,
  icon: Store,
  active: true,
  component: StorePage,
  settingsRoute: true,
});
