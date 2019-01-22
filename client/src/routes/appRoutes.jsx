// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
// core components/views

import LoginPage from "containers/pages/LoginPage"
import RegisterPage from "containers/pages/RegisterPage"
import  DashboardPage from "containers/pages/DashboardPage"
import  HomePage from "containers/pages/HomePage"
import  UserPage from "containers/pages/UserPage"


const dashboardRoutes = [
    {
        path: "/home",
        anonymous: true,
        authenticated: true,
        sidebarName: "Home",
        navbarName: "Home",
        icon: LocationOn,
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
