import React, { useCallback, useEffect } from 'react';
import PropTypes, { object } from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import GridContainer from './base/grid/GridContainer';
import GridItem from './base/grid/GridItem';
import TenantCard from './TenantCard';
import { Trans } from "react-i18next";


export default function  TenantCardList({authenticate, onLoad, onLoadTenants, onLoadInvitations,onTenantLogin,
    profile,onLoadAccessibleTenants,tenants,invitations}) {

      useEffect(() => {
        onLoad()
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
    
            {invitations.items !==undefined && invitations.items.length > 0  && <React.Fragment>
            <Trans>Invitations</Trans>  
            <GridContainer>
                 {tenants.items && tenants.items.map((tenant,index) =>(
                    !tenant.attached && <GridItem xs={12} sm={6} md={4} key = {index}>
                        <TenantCard  tenant = {tenant} onTenantLogin={onTenantLogin} actions ={["join"]}/>
                    </GridItem>
                ))
                }
            </GridContainer>   
            </React.Fragment>
            }             

    
    
    
             {authenticate.tenants.length > 0  && <React.Fragment>
            <Trans>My teams</Trans>
            <GridContainer>
                  {authenticate.tenants && authenticate.tenants.map((tenant,index) =>(
                    <React.Fragment>
                   <GridItem xs={12} sm={6} md={4}  key = {index}>
                        <TenantCard  tenant = {tenant} onTenantLogin={onTenantLogin} actions ={["login"]}/>
                    </GridItem>
              
                    </React.Fragment>
                ))
                }
            </GridContainer> 
            </React.Fragment>
            }      
    
            {tenants.items.length > 0  && <React.Fragment>
            <Trans>Teams I can join</Trans>    
            <GridContainer>
                 {tenants.items && tenants.items.map((tenant,index) =>(
                    !tenant.attached && <GridItem xs={12} sm={6} md={4} key = {index}>
                        <TenantCard  tenant = {tenant} onTenantLogin={onTenantLogin} actions ={["join"]}/>
                    </GridItem>
                ))
                }
            </GridContainer>   
            </React.Fragment>
            }   


          </React.Fragment>
      )
}
        


TenantCardList.propTypes = {
    profile: PropTypes.object.isRequired,
    tenants: PropTypes.object,
    invitations: PropTypes.object,
    onLoad: PropTypes.func,
    onLoadTenants: PropTypes.func,
    onTenantLogin: PropTypes.func,
    onTenantJoin: PropTypes.func,
    onCreateTenant: PropTypes.func,
    onLoadAccessibleTenants: PropTypes.func,
    onLoadInvitations: PropTypes.func
};
