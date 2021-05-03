import React from 'react';
import SwitchRoutes from './SwitchRoutes'
import {routes,anonymousRedirects,authenticatedRedirects} from "routes/appRoutes.jsx";

export default function  AuthenticatedRoutes() {
    var authRouted = routes.filter(route => route.active && route.authenticated)
    return(
        <SwitchRoutes routes={authRouted} redirects = {authenticatedRedirects}/>        
    )
}