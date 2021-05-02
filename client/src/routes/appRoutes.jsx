
import React from 'react'


import {statisticPath} from "routes/pathes/statisticPath"
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
import { settingsPath } from './pathes/settingsPath';
import RedirectPath from './redirectPath';
import { rootPath } from './pathes/rootPath';

export const anonymousRedirects = [
     new RedirectPath({ from: rootPath, to: homePath}),
]

export const authenticatedRedirects = [
   new RedirectPath({ from: homePath, to: dashboardPath}),
   new RedirectPath({ from: loginPath, to: dashboardPath}),
   new RedirectPath({ from: rootPath, to: dashboardPath}),
]

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
  departmentsPath,
  peoplePath,
  donutsPath,
  myReagrdsPath,
  requestsPath,
  statisticPath,
  settingsPath,
];

