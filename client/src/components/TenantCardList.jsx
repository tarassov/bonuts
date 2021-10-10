import React, { useCallback, useEffect } from 'react';
import PropTypes, { object } from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import GridContainer from './base/grid/GridContainer';
import GridItem from './base/grid/GridItem';
import TenantCard from './TenantCard';
import tenantCardStyle from 'assets/jss/components/tenantCardStyle'


export default function  TenantCardList({authenticate, onLoad,onTenantLogin,profile,onLoadAccessibleTenants,tenants}) {

      useEffect(() => {
        onLoad()
      }, []);

      useEffect(() => {
         onLoadAccessibleTenants(profile.email);  
      }, [profile.email]);
      
      return (
          <React.Fragment>
             Мои команды  
            <GridContainer>
                  {authenticate.tenants && authenticate.tenants.map((tenant,index) =>(
                    <GridItem xs={12} sm={12} md={6}  key = {index}>
                        <TenantCard  tenant = {tenant} onTenantLogin={onTenantLogin} actions ={["login"]}/>
                    </GridItem>
                ))
                }
            </GridContainer>                  
            Доступные команды   
            <GridContainer>
                 {tenants.items && tenants.items.map((tenant,index) =>(
                    !tenant.attached && <GridItem xs={12} sm={12} md={6} key = {index}>
                        <TenantCard  tenant = {tenant} onTenantLogin={onTenantLogin} actions ={["join"]}/>
                    </GridItem>
                ))
                }
            </GridContainer>   
          </React.Fragment>
      )
}
        


TenantCardList.propTypes = {
    profile: PropTypes.object.isRequired,
    tenants: PropTypes.object,
    loadTenant: PropTypes.func,
    joinTenant: PropTypes.func,
    createTenant: PropTypes.func,
    onLoadAccessibleTenants: PropTypes.func
};
