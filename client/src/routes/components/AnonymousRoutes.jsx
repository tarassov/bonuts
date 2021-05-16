import React from 'react';
import SwitchRoutes from './SwitchRoutes'
import {getRoutes,anonymousRedirects} from "routes/appRoutes.jsx";

export default function  AnonymousRoutes() {
    var authRouted = getRoutes({anonymous: true})
    return(
        <SwitchRoutes routes={authRouted} redirects = {anonymousRedirects}/>        
    )
}