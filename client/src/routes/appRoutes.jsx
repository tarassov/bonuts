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
import { myRequestsPath } from "./pathes/myRequestsPath";
import { requestsPath } from "./pathes/requests/requestsPath";
import { settingsPath } from "./pathes/settingsPath";
import { tenantsListPath } from "./pathes/tenantsListPath";
import { createDonutPath } from "./pathes/createDonutPath";
import RedirectPath from "./redirectPath";
import { rootPath } from "./pathes/rootPath";
import {storePath} from "./pathes/storePath"
import {donutEditPath} from "./pathes/donutEditPath"
import { donutPreviewPath } from "./pathes/donutPreviewPath";
import { schedulersPath } from "./pathes/schedulersPath";
import { pluginsPath } from "./pathes/pluginsPath";
import { tenantSettingsPath } from "./pathes/tenantSettingsPath";
import { incomingRequestsPath } from "./pathes/requests/incomingRequestsPath";
import { activeRequestsPath } from "./pathes/requests/activeRequestsPath";
import { closedRequestsPath } from "./pathes/requests/closedRequestsPath";
import { shareAllPath } from "./pathes/shareAllPath";

export const anonymousRedirects = [
  new RedirectPath({ from: rootPath, to: homePath }),
];

export const authenticatedRedirects = [
   new RedirectPath({ from: homePath, to: dashboardPath }),
   new RedirectPath({ from: loginPath, to: dashboardPath }),
   new RedirectPath({ from: rootPath, to: dashboardPath }),
];

export const notAttachedRedirect = [
   new RedirectPath({ from: dashboardPath, to: tenantsListPath }),
   new RedirectPath({ from: rootPath, to: tenantsListPath }),
];
export const rootRedirects = [];

export const routes = [
  homePath,
  dashboardPath,
  loginPath,
  registerPath,
  confirmEmailPath,
  recoverPasswordPath,
  accountOperationPath,
  quizPath,
  eventPath,
  accountPath,
 // departmentsPath,
  peoplePath,
  donutsPath,
  myRequestsPath,
  requestsPath,
  statisticPath,
  settingsPath,
  tenantsListPath,
  createDonutPath,
  storePath,
  donutEditPath,  
  donutPreviewPath,
  schedulersPath,
  pluginsPath,
  tenantSettingsPath,
  incomingRequestsPath,
  activeRequestsPath,
  closedRequestsPath,
  shareAllPath
];

export function getRoutes(props) {
  var tenantDefined = props.currentTenant ? true : false;
  var authenticated = props.authenticated ? props.authenticated : false;
  var anonymous = props.anonymous ? props.anonymous : false;
  var store_admin = props.profile ? props.profile.store_admin : false;
  var admin = props.profile ? props.profile.admin : false;

  var result = routes.filter(
    (route) =>
      route.active &&
      (route.authenticated == authenticated || route.anonymous == anonymous) &&
      (tenantDefined || route.tenantNotRequired) 
       &&
       (
         (route.admin && admin) || (route.store_admin && store_admin) || (!route.store_admin && !route.admin)
       )
  );
  console.log(result)
  console.log(props)
  return result;
}

export function getChildRoutes(props){
  var parentPath = props.parent ? props.parent : undefined
  var  routes =getRoutes(props)

  if (parentPath === undefined) return routes;

  return routes.filter((route)=>{
     return route.config.parent !==undefined && route.config.parent.config.path === parentPath.config.path
  })
}
