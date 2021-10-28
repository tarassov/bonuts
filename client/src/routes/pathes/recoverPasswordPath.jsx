import AppPath from "routes/appPath";
import NewPasswordPage from "containers/pages/NewPasswordPage";

export const recoverPasswordPath = new AppPath({
  path: "/recover_password/:token",
  anonymous: true,
  authenticated: true,
  root: true,
  active: true,
  hideInMenu: true,
  sidebarName: "RecoverPassword",
  navbarName: "RecoverPassword",
  component: NewPasswordPage,
});
