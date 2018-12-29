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

import LoginPage from "pages/LoginPage"
import RegisterPage from "pages/RegisterPage"
import  DashboardPage from "pages/DashboardPage"
import  HomePage from "pages/HomePage"
import  UserPage from "pages/UserPage"


const dashboardRoutes = [
  {
    path: "/dashboard",
    authenticated: true,
    anonymous: true,
    sidebarName: "Dashboard",
    navbarName: "Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/login",
    anonymous: true,
    authenticated: false,
    sidebarName: "Log In",
    navbarName: "Log In",
    icon: Person,
    component: LoginPage
  },
  {
    path: "/register",
    anonymous: true,
      authenticated:false,
    sidebarName: "Register",
    navbarName: "Register",
    icon: Person,
    component: RegisterPage
  },
  {
    path: "/account",
      anonymous: false,
      authenticated: true,
    sidebarName: "Account",
    navbarName: "Account",
    icon: Person,
    component: UserPage
  },
  {
    path: "/home",
    anonymous: true,
    authenticated: true,
    sidebarName: "Home",
    navbarName: "Home",
    icon: LocationOn,
    component: HomePage
  },
  {
      redirect: true,
      anonymous: true,
      authenticated: true,
      path: "/", to: "/dashboard",
      navbarName: "Redirect"
  },
    {
        redirect: true,
        anonymous: false,
        authenticated: true,
        path: "/", to: "/dashboard",
        navbarName: "Redirect"
    },
    {
        redirect: true,
        anonymous: true,
        authenticated: false,
        path: "/", to: "/dashboard",
        navbarName: "Redirect"
    },
];

export default dashboardRoutes;
