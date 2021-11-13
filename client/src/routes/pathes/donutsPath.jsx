import AppPath from "routes/appPath";
import Store from "@material-ui/icons/Store";
//import DonutsPage from "containers/pages/DonutsPage";
import DonutsLayout from "layouts/DonutsLayout";

export const donutsPath = new AppPath({
  path: "/donuts",
  anonymous: false,
  authenticated: true,
  sidebarName: "Donuts",
  navbarName: "Donuts",
  icon: Store,
  active: true,
  component: DonutsLayout,
});
