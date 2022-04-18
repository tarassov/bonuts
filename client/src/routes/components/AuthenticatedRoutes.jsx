import React from "react";
import SwitchRoutes from "./SwitchRoutes";
import {
  getRoutes,
  authenticatedRedirects,
  notAttachedRedirect,
} from "routes/appRoutes.jsx";

export default function AuthenticatedRoutes({routes,currentTenant}) {
  var redirects = authenticatedRedirects;
  if (!currentTenant) redirects = notAttachedRedirect;
  return (
    <SwitchRoutes
      routes={routes}
      redirects={redirects}
    />
  );
}
