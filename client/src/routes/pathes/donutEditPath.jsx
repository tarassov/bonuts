import AppPath from "routes/appPath";
import DonutEditPage from "containers/pages/DonutEditPage";

export const donutEditPath = new AppPath({
  path: "/donut/:id",
  anonymous: false,
  authenticated: true,
  active: true,
  hideInMenu: true,
  component: DonutEditPage,
});
