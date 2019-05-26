
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Store from "@material-ui/icons/Store";

import LocationOn from "@material-ui/icons/LocationOn";


import LoginPage from "containers/pages/LoginPage"
import RegisterPage from "containers/pages/RegisterPage"
import  DashboardPage from "containers/pages/DashboardPage"
import  HomePage from "containers/pages/HomePage"
import  UserPage from "containers/pages/UserPage"
import  ProfileAssetsPage from "containers/pages/ProfileAssetsPage"
import  StorePage from "containers/pages/StorePage"
import ConfirmEmailPage  from "containers/pages/ConfirmEmailPage"
import NewPasswordPage  from "containers/pages/NewPasswordPage"
import React from 'react'

const dashboardRoutes = [
    {
        path: "/home",
        anonymous: true,
        authenticated: true,
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
    path: "/store",
      anonymous: false,
      authenticated: true,
    sidebarName: "Store",
    navbarName: "Store",
    icon: Store,
    active: true,
    component: StorePage
  },
  {
    path: "/my",
      anonymous: false,
      authenticated: true,
    sidebarName: "My",
    navbarName: "My",
    icon: Store,
    active: true,
    component: ProfileAssetsPage
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
