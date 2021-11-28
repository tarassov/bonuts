import React, { useCallback, useEffect } from "react";
import PropTypes, { object } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "./base/grid/GridContainer";
import GridItem from "./base/grid/GridItem";
import TenantCard from "./TenantCard";
import InvitationCard from "./InvitationCard";
import { Trans } from "react-i18next";
import { Redirect } from "react-router-dom";

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
      {invitations.items.length > 0 && (
        <React.Fragment>
          <Trans>Invitations</Trans>
          <GridContainer>
            {invitations.items.map((invitation, index) => (
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

      {authenticate.tenants.length > 0 && (
        <React.Fragment>
          <Trans>My teams</Trans>
          <GridContainer>
            {authenticate.tenants &&
              authenticate.tenants.map((tenant, index) => (
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

      {accessible_tenants.items.length > 0 && (
        <React.Fragment>
          <Trans>Teams I can join</Trans>
          <GridContainer>
            {accessible_tenants.items &&
              accessible_tenants.items.map(
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
