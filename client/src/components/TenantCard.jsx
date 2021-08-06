import React,{ useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import tenantCardStyle from 'assets/jss/components/tenantCardStyle'
import PropTypes from 'prop-types'
import { Link } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { loginPath } from 'routes/pathes/loginPath';

const useStyles = makeStyles(tenantCardStyle);
  


export default function  TenantCard(props) {

    const classes = useStyles();
    const { t, i18n } = useTranslation();

    const onClickLogin = useCallback(() => {
         props.onTenantLogin(props.tenant.name)
      }, [props.tenant]);
     
    const onClickJoin = useCallback(() => {
       
    }, [props.tenant]);

    var action = props.action ?? ["login"]
    return (
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                      <Typography component="h4">
                           {props.tenant.caption}         
                      </Typography>   
                </CardContent>
                <CardActions className={classes.actions}>
                    {action.includes("login") && <Link  href="#" onClick={onClickLogin}>{t('Go to')}</Link>}
                    {action.includes("join") && <Link  href="#" onClick={onClickJoin}>{t('Join')}</Link>}
                </CardActions>
            </Card>
        );
 }



 TenantCard.propTypes = {
    tenant: PropTypes.string.isRequired,
    onTenantLogin: PropTypes.func,
    actions: PropTypes.array
};
