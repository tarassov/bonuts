import React from 'react';
import {Switch, Route, Redirect } from 'react-router-dom'

export default function SwitchRoutes({routes, redirects})  {
  return(
    <Switch>
        {routes.map((route, key) => {
        if (route.config.anonymous && route.config.active) {          
            return <Route path={route.config.path} component={route.config.component} key={key}/>;
        }
        })}
        {redirects.map((redirect, key) =>{
          return <Redirect path={redirect.from.path} to={redirect.to.path} key={key}/>;
        })}
      </Switch>
  )
}

