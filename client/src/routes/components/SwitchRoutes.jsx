// nodejs library to set properties for components
import PropTypes from "prop-types";

import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

export default function SwitchRoutes({ routes, redirects }) {
  return (
    <Switch>
      {routes.map((route, key) => {
        return (
          <Route
            path={route.config.path}
            component={route.config.component}
            key={key}
          />
        );
      })}
      {redirects.map((redirect, key) => {
        return (
          <Redirect path={redirect.from.path} to={redirect.to.path} key={key} />
        );
      })}
    </Switch>
  );
}
SwitchRoutes.propTypes = {
  routes: PropTypes.object,
};
