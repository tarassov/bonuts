
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Store from "@material-ui/icons/Store";
import List from "@material-ui/icons/List";
import Stars from "@material-ui/icons/Stars";
import People from "@material-ui/icons/People";
import Settings from "@material-ui/icons/Settings";
import BarChart from "@material-ui/icons/BarChart";

import LocationOn from "@material-ui/icons/LocationOn";


import LoginPage from "containers/pages/LoginPage"
import RegisterPage from "containers/pages/RegisterPage"
import  DashboardPage from "containers/pages/DashboardPage"
import  HomePage from "containers/pages/HomePage"
import  UserPage from "containers/pages/UserPage"
import  RegardsPage from "containers/pages/RegardsPage"
import  SettingsPage from "containers/pages/SettingsPage"
import  StorePage from "containers/pages/StorePage"
import ConfirmEmailPage  from "containers/pages/ConfirmEmailPage"
import NewPasswordPage  from "containers/pages/NewPasswordPage"
import DepartmentsPage  from "containers/pages/DepartmentsPage"
import React from 'react'
import PeoplePage from "containers/pages/ProfilesPage";
import DonutsPage from "containers/pages/DonutsPage";
import AccountOperationsPage from "containers/pages/AccountOperationsPage";
import StatisticPage from "containers/pages/StatisticPage";
import EventPage from "containers/pages/EventPage";

const dashboardRoutes = [
    {
        path: "/home",
        anonymous: true,
        authenticated: false,
        sidebarName: "Home",
        navbarName: "Home",
        icon: LocationOn,
        hideInMenu: true,
        active: true,
        component: HomePage
    },
  {
    path: "/dashboard",
    authenticated: true,
    anonymous: true,
    sidebarName: "Dashboard",
    navbarName: "Dashboard",
    icon: Dashboard,
    hideInMenu: false,
    active: true,
    component: DashboardPage
  },
  {
    path: "/login",
    anonymous: true,
    authenticated: false,
    sidebarName: "Log In",
    navbarName: "Log In",
    icon: Person,
    active:true,
    component: LoginPage
  },
  {
    path: "/register",
    anonymous: true,
      authenticated:false,
    sidebarName: "Register",
    navbarName: "Register",
    icon: Person,
    active: true,
    component: RegisterPage
  },
  {
      path: "/confirm_email/:token",
      anonymous: true,
      authenticated:false,
      active: true,
      hideInMenu: true,
      sidebarName: "ConfirmEmail",
      navbarName: "ConfirmEmail",
      component: ConfirmEmailPage
  },
  {
      path: "/recover_password/:token",
      anonymous: true,
      authenticated:false,
      active: true,
      hideInMenu: true,
      sidebarName: "RecoverPassword",
      navbarName: "RecoverPassword",
      component: NewPasswordPage
  },
  {
    path: "/account/:id",
    anonymous: false,
    authenticated:true,
    active: true,
    hideInMenu: true,
    sidebarName: "AccountOperationsPage",
    navbarName: "AccountOperationsPage",
    component: AccountOperationsPage
  },
  {
    path: "/event/:id",
    anonymous: false,
    authenticated:true,
    active: true,
    hideInMenu: true,
    sidebarName: "AccountOperationsPage",
    navbarName: "AccountOperationsPage",
    component: EventPage
  },
  {
    path: "/account",
      anonymous: false,
      authenticated: true,
    sidebarName: "Account",
    navbarName: "Account",
    icon: Person,
    active: true,
    component: UserPage
  },
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
    path: "/statistic",
    anonymous: false,
    authenticated: true,
    sidebarName: "Statistic",
    navbarName: "Statistic",
    admin: true,
    icon: BarChart,
    active: true,
    component: StatisticPage
  },
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
