import AppPath from "../appPath";
import StatisticPage from "containers/pages/StatisticPage";
import BarChart from "@material-ui/icons/BarChart";

export const statisticPath = new AppPath({
  path: "/statistic",
  sidebarName: "Statistic",
  navbarName: "Statistic",
  admin: true,
  icon: BarChart,
  component: StatisticPage,
});
