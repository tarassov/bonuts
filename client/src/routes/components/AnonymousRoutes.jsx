import React from 'react';
import SwitchRoutes from './SwitchRoutes'
import {routes,anonymousRedirects,authenticatedRedirects} from "routes/appRoutes.jsx";

export default function  AnonymousRoutes() {
    var authRouted = routes.filter(route => route.active && route.anonymous)
    return(
        <SwitchRoutes routes={authRouted} redirects = {anonymousRedirects}/>        
    )
}