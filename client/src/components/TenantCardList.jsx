import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import GridContainer from './grid/GridContainer';
import GridItem from './grid/GridItem';
import TenantCard from './TenantCard';
import tenantCardStyle from 'assets/jss/components/tenantCardStyle'
const useStyles = makeStyles(tenantCardStyle);


export default function  TenantCardList({authenticate, onLoad,onTenantLogin}) {
    const classes = useStyles();

      useEffect(() => {
        onLoad();  
      }, []);


      
      return (
          <React.Fragment>
            <GridContainer className={classes.list}>
                {authenticate.tenants && authenticate.tenants.map((tenant,index) =>(
                    <GridItem xs={12} sm={12} md={12} key = {index}>
                        <TenantCard  tenant = {tenant} onTenantLogin={onTenantLogin} actions ={["login"]}/>
                    </GridItem>
                ))
                }
            </GridContainer>                      
          </React.Fragment>
      )
}
        


TenantCardList.propTypes = {
    profile: PropTypes.object.isRequired,
    loadTenant: PropTypes.func,
    joinTenant: PropTypes.func,
    createTenant: PropTypes.func,
    getAvailableTenants: PropTypes.func
};
