// nodejs library to set properties for components
import PropTypes from "prop-types";

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

export default function SwitchRoutes({ routes, redirects }) {
  return (
    <Routes>
      {routes && routes.map((route, key) => {
        return (
          <Route
            path={route.config.path}
            element={route.config.component}
            key={key}
          />
        );
      })}
      
      {redirects.map((redirect, key) => {
        return (
          <Route path={redirect.from.path}  key={key} element = {<Navigate to={redirect.to.path}/>}/>
        );
      })}
    </Routes>
  );
}
SwitchRoutes.propTypes = {
  routes: PropTypes.array,
  redirects: PropTypes.array
};
