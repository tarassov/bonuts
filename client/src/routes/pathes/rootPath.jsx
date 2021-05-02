import  DashboardPage from "containers/pages/DashboardPage"
import Dashboard from "@material-ui/icons/Dashboard";
import AppPath from "routes/appPath";

export const rootPath = new AppPath(
    {
        path: "/",
        authenticated: false,
        anonymous: true,
        hideInMenu: true,
        active: true,
      },
)


