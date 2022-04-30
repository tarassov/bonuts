import React from "react";
import AppPath from "../appPath";
import StatisticPage from "containers/pages/StatisticPage";
import BarChart from "@material-ui/icons/BarChart";

export const statisticPath = new AppPath({
  path: "/statistic",
  sidebarName: "Statistic",
  navbarName: "Statistic",
  anonymous: false,
  authenticated: true,
  admin: true,
  store_admin: true,
  hideInMenu:false, 
  icon: BarChart,
  component: <StatisticPage/>,
});
