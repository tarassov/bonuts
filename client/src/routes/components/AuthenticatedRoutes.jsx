import React from 'react';
import SwitchRoutes from './SwitchRoutes'
import {getRoutes,authenticatedRedirects,notAttachedRedirect} from "routes/appRoutes.jsx";

export default function  AuthenticatedRoutes (props) {
    var redirects = authenticatedRedirects
    if (!props.currentTenant) redirects = notAttachedRedirect

        
    return(
        <SwitchRoutes routes={getRoutes({currentTenant: props.currentTenant, authenticated: true})} redirects = {redirects}/>        
    )
}