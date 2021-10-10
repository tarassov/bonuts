import React,{ useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from 'components/base/card/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import tenantCardStyle from 'assets/jss/components/tenantCardStyle'
import PropTypes from 'prop-types'
import { Link } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import CardBody from 'components/base/card/CardBody';
import Home from "@material-ui/icons/Home";
import Button from 'components/base/customButtons/Button';

const useStyles = makeStyles(tenantCardStyle);
  


export default function  TenantCard(props) {

    const classes = useStyles();
    const { t } = useTranslation();

    const onClickLogin = useCallback(() => {
         props.onTenantLogin(props.tenant.name)
      }, [props.tenant]);
     
    const onClickJoin = useCallback(() => {
       
    }, [props.tenant]);

    var action = props.actions ?? ["login"]
    return (
            <Card team raised color="primary">
                <CardBody team>
                  <h6 className={classes.cardCategory}> {props.tenant.caption}  </h6>
                  <div className={classes.icon}>
                    <Home className={classes.iconRose} />
                  </div>
                  <h3 className={`${classes.cardTitle} ${classes.marginTop30}`}>
                  {props.tenant.caption}
                  </h3>
                  {action.includes("login") && <Button round color="gray"  onClick={onClickLogin}>{t('Go to')}</Button>}
                  {action.includes("join") && <Button round color="gray"  onClick={onClickJoin}>{t('Join')}</Button>}              
                </CardBody>      
            </Card>
        );
 }



 TenantCard.propTypes = {
    tenant: PropTypes.object.isRequired,
    onTenantLogin: PropTypes.func,
    actions: PropTypes.array
};
