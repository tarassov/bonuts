import React, { useCallback, useEffect,useState } from "react";
import PropTypes, { object } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "./base/grid/GridContainer";
import GridItem from "./base/grid/GridItem";
import TenantCard from "./TenantCard";
import InvitationCard from "./InvitationCard";
import { Trans } from "react-i18next";
import { Redirect } from "react-router-dom";
import { Typography } from "@material-ui/core";

export default function TenantCardList({
  authenticate,
  onLoad,
  onLoadTenants,
  onLoadInvitations,
  onTenantLogin,
  onInvitationAccept,
  onInvitationDecline,
  onTenantJoin,
  profile,
  onLoadAccessibleTenants,
  invitations,
  accessible_tenants,
}) {
  useEffect(() => {
    onLoad();
  }, []);

  const [invitationsItems, setInvitationsItems] = useState([]) 
  const [tenantsItems, setTenantsItems] = useState([]) 
  const [accessibleTenantsItems, setAccessibleTenantsItems] = useState([]) 

  useEffect(() => {
        if(invitations.items !==null) {
          setInvitationsItems(invitations.items)
        }
        else{
          setInvitationsItems([])
        }
    }
  , [invitations])

  useEffect(() => {
    if( authenticate.tenants !==null) {
        setTenantsItems( authenticate.tenants)
      }
      else{
        setTenantsItems([])
      }
  }
  , [ authenticate.tenants])

useEffect(() => {
  if(accessible_tenants.items !==null) {
    setAccessibleTenantsItems(accessible_tenants.items)
  }
  else{
    setAccessibleTenantsItems([])
  }
}
, [accessible_tenants])



  useEffect(() => {
    onLoadAccessibleTenants();
  }, []);
  useEffect(() => {
    onLoadTenants();
  }, [profile.email]);
  useEffect(() => {
    onLoadInvitations();
  }, []);

  return (
    <React.Fragment>
      {invitationsItems.length > 0 && (
        <React.Fragment>
          <Trans>Invitations</Trans>
          <GridContainer>
            {invitationsItems.map((invitation, index) => (
              <GridItem xs={12} sm={6} md={4} key={index}>
                <InvitationCard
                  invitation={invitation}
                  onInvitationAccept={onInvitationAccept}
                  onInvitationDecline={onInvitationDecline}
                />
              </GridItem>
            ))}
          </GridContainer>
        </React.Fragment>
      )}

      {tenantsItems.length > 0 && (
        <React.Fragment>
         <Typography><Trans>My teams</Trans></Typography>
          <GridContainer>
            {tenantsItems.map((tenant, index) => (
                  <GridItem xs={12} sm={6} md={4} key={index}>
                    <TenantCard
                      tenant={tenant}
                      onTenantLogin={onTenantLogin}
                      actions={["login"]}
                    />
                  </GridItem>
              ))}
          </GridContainer>
        </React.Fragment>
      )}

      {accessibleTenantsItems.length > 0 && (
        <React.Fragment>
          <Typography><Trans>Teams I can join</Trans></Typography>
          <GridContainer>
            {
              accessibleTenantsItems.map(
                (tenant, index) =>
                  !tenant.attached && (
                    <GridItem xs={12} sm={6} md={4} key={index}>
                      <TenantCard
                        tenant={tenant}
                        onTenantJoin={onTenantJoin}
                        actions={["join"]}
                      />
                    </GridItem>
                  )
              )}
          </GridContainer>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

TenantCardList.propTypes = {
  profile: PropTypes.object.isRequired,
  tenants: PropTypes.object,
  accessible_tenants: PropTypes.object,
  invitations: PropTypes.object,
  onLoad: PropTypes.func,
  onLoadTenants: PropTypes.func,
  onTenantLogin: PropTypes.func,
  onTenantJoin: PropTypes.func,
  onCreateTenant: PropTypes.func,
  onLoadAccessibleTenants: PropTypes.func,
  onLoadInvitations: PropTypes.func,
  onInvitationAccept: PropTypes.func,
  onInvitationDecline: PropTypes.func,
};
