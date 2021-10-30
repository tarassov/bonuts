import App from "containers/AppContainer";
import NewPasswordPage from "containers/pages/NewPasswordPage";

const indexRoutes = [
  { path: "/recover_password/:token", component: NewPasswordPage },
  { path: "/", component: App },
];

export default indexRoutes;
