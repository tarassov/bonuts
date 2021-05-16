import React from 'react';
import SwitchRoutes from './SwitchRoutes'
import {getRoutes,authenticatedRedirects} from "routes/appRoutes.jsx";

export default function  AuthenticatedRoutes (props) {
    return(
        <SwitchRoutes routes={getRoutes({currentTenant: props.currentTenant, authenticated: true})} redirects = {authenticatedRedirects}/>        
    )
}