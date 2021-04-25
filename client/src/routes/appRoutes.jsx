

import Store from "@material-ui/icons/Store";
import List from "@material-ui/icons/List";
import Stars from "@material-ui/icons/Stars";
import People from "@material-ui/icons/People";
import Settings from "@material-ui/icons/Settings";
import Input from "@material-ui/icons/Input";




import  RegardsPage from "containers/pages/RegardsPage"
import  SettingsPage from "containers/pages/SettingsPage"

import NewPasswordPage  from "containers/pages/NewPasswordPage"
import DepartmentsPage  from "containers/pages/DepartmentsPage"
import React from 'react'
import PeoplePage from "containers/pages/ProfilesPage";
import DonutsPage from "containers/pages/DonutsPage";
import AccountOperationsPage from "containers/pages/AccountOperationsPage";
import EventPage from "containers/pages/EventPage";
import QuizPage from "containers/pages/QuizPage";
import RequestsPage from "containers/pages/RequestsPage"
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

const dashboardRoutes = [  
  homePath.config,
  dashboardPath.config,
  loginPath.config,
  registerPath.config,
  confirmEmailPath.config,
  recoverPasswordPath.config,
  accountOperationPath.config,
  quizPath.config,
  eventPath.config,
  accountPath.config,
  {
    path: "/departments",
      anonymous: false,
      authenticated: true,
    sidebarName: "Departments",
    navbarName: "Departments",
    icon: List,
    active: true,
    admin: true,
    component: DepartmentsPage
  },
  {
    path: "/people",
      anonymous: false,
      authenticated: true,
    sidebarName: "People",
    navbarName: "People",
    icon: People,
    active: true,
    admin: false,
    component: PeoplePage
  },

  {
    path: "/donuts",
      anonymous: false,
      authenticated: true,
    sidebarName: "Donuts",
    navbarName: "Donuts",
    icon: Store,
    active: true,
    component: DonutsPage
  },
  {
    path: "/my",
      anonymous: false,
      authenticated: true,
    sidebarName: "My regards",
    navbarName: "My regards",
    icon: Stars,
    active: true,
    component: RegardsPage
  },
  {
    path: "/requests",
      anonymous: false,
      authenticated: true,
    sidebarName: "Requests",
    navbarName: "Requests",
    icon: Input,
    active: true,
    store_admin: true,
    component: RequestsPage
  },
  statisticPath.getConfig(),
  {
    path: "/settings",
    anonymous: false,
    authenticated: true,
    sidebarName: "Settings",
    navbarName: "Settings",
    admin: true,
    icon: Settings,
    active: true,
    component: SettingsPage
  },
    {
        redirect: true,
        anonymous: false,
        authenticated: true,
        active:true,
        path: "/login", to: "/dashboard",
        navbarName: "Redirect"
    },
    {
      redirect: true,
      anonymous: false,
      authenticated: true,
      active:true,
      path: "/home", to: "/dashboard",
      navbarName: "Redirect"
  },

  {
      redirect: true,
      anonymous: true,
      authenticated: false,
      active:true,
      path: "/", to: "/home",
      navbarName: "Redirect"
  },
  {
      redirect: true,
      anonymous: false,
      authenticated: true,
      active:true,
      path: "/", to: "/dashboard",
      navbarName: "Redirect"
  },


];

export default dashboardRoutes;
