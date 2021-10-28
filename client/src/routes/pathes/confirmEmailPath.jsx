import AppPath from "routes/appPath";
import ConfirmEmailPage from "containers/pages/ConfirmEmailPage";

export const confirmEmailPath = new AppPath({
  path: "/confirm_email/:token",
  anonymous: true,
  authenticated: false,
  active: true,
  hideInMenu: true,
  sidebarName: "ConfirmEmail",
  navbarName: "ConfirmEmail",
  component: ConfirmEmailPage,
});
