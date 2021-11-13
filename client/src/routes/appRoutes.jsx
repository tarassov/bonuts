import React from "react";

import { statisticPath } from "routes/pathes/statisticPath";
import { homePath } from "./pathes/homePath";
import { dashboardPath } from "./pathes/dashboardPath";
import { loginPath } from "./pathes/loginPath";
import { registerPath } from "./pathes/registerPath";
import { accountPath } from "./pathes/accountPath";
import { confirmEmailPath } from "./pathes/confirmEmailPath";
import { recoverPasswordPath } from "./pathes/recoverPasswordPath";
import { accountOperationPath } from "./pathes/accountOperationPath";
import { quizPath } from "./pathes/quizPath";
import { eventPath } from "./pathes/eventPath";
import { departmentsPath } from "./pathes/departmentsPath";
import { peoplePath } from "./pathes/peoplePath";
import { donutsPath } from "./pathes/donutsPath";
import { myReagrdsPath } from "./pathes/myRegardsPath";
import { requestsPath } from "./pathes/requestsPath";
import { settingsPath } from "./pathes/settingsPath";
import { tenantsListPath } from "./pathes/tenantsListPath";
import { createDonutPath } from "./pathes/createDonutPath";
import RedirectPath from "./redirectPath";
import { rootPath } from "./pathes/rootPath";
import {storePath} from "./pathes/storePath"
import {donutEditPath} from "./pathes/donutEditPath"

export const anonymousRedirects = [
  //new RedirectPath({ from: rootPath, to: homePath }),
];

export const authenticatedRedirects = [
  // new RedirectPath({ from: homePath, to: dashboardPath }),
  // new RedirectPath({ from: loginPath, to: dashboardPath }),
  // new RedirectPath({ from: rootPath, to: dashboardPath }),
];

export const notAttachedRedirect = [
  // new RedirectPath({ from: dashboardPath, to: tenantsListPath }),
  // new RedirectPath({ from: rootPath, to: tenantsListPath }),
];
export const rootRedirects = [];

export const routes = [
  homePath,
  dashboardPath,
  loginPath,
  registerPath,
  // confirmEmailPath,
  // recoverPasswordPath,
  // accountOperationPath,
  // quizPath,
  // eventPath,
  // accountPath,
  // departmentsPath,
  // peoplePath,
   donutsPath,
  // myReagrdsPath,
  // requestsPath,
  // statisticPath,
  // settingsPath,
  // tenantsListPath,
  // createDonutPath,
  // storePath,
  // donutEditPath,
];

export function getRoutes(props) {
  var tenantDefined = props.currentTenant ? true : false;
  var authenticated = props.authenticated ? props.authenticated : false;
  var anonymous = props.anonymous ? props.anonymous : false;

  var result = routes.filter(
    (route) =>
      route.active &&
      (route.authenticated == authenticated || route.anonymous == anonymous) &&
      (tenantDefined || route.tenantNotRequired)
  );
  return result;
}
