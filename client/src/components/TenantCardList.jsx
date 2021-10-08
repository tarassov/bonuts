import React, { useCallback, useEffect } from 'react';
import PropTypes, { object } from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import GridContainer from './grid/GridContainer';
import GridItem from './grid/GridItem';
import TenantCard from './TenantCard';
import tenantCardStyle from 'assets/jss/components/tenantCardStyle'
const useStyles = makeStyles(tenantCardStyle);


export default function  TenantCardList({authenticate, onLoad,onTenantLogin,profile,onLoadAvailableTenants,tenants}) {
    const classes = useStyles();

      useEffect(() => {
        onLoad()
      }, []);

      useEffect(() => {
         onLoadAccessibleTenants(profile.email);  
      }, [profile.email]);
      
      return (
          <React.Fragment>
            <GridContainer className={classes.list}>
                Мои команды  
                {authenticate.tenants && authenticate.tenants.map((tenant,index) =>(
                    <GridItem xs={12} sm={12} md={12} key = {index}>
                        <TenantCard  tenant = {tenant} onTenantLogin={onTenantLogin} actions ={["login"]}/>
                    </GridItem>
                ))
                }
            </GridContainer>                  
            <GridContainer className={classes.list}>
                Доступные команды   
                {tenants.items && tenants.items.map((tenant,index) =>(
                    !tenant.attached && <GridItem xs={12} sm={12} md={12} key = {index}>
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
    onLoadAvailableTenants: PropTypes.func
};
