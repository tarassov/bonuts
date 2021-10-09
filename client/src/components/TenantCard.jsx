import React,{ useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from 'components/card/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import tenantCardStyle from 'assets/jss/components/tenantCardStyle'
import PropTypes from 'prop-types'
import { Link } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import CardBody from 'components/card/CardBody';
import Home from "@material-ui/icons/Home";
import Button from 'components/customButtons/Button';

const useStyles = makeStyles(tenantCardStyle);
  


export default function  TenantCard(props) {

    const classes = useStyles();
    const { t, i18n } = useTranslation();

    const onClickLogin = useCallback(() => {
         props.onTenantLogin(props.tenant.name)
      }, [props.tenant]);
     
    const onClickJoin = useCallback(() => {
       
    }, [props.tenant]);

    var action = props.actions ?? ["login"]
    return (
            <Card team raised color="info">
                <CardBody team>
                  <h6 className={classes.cardCategory}> {props.tenant.caption}  </h6>
                  <div className={classes.icon}>
                    <Home className={classes.iconRose} />
                  </div>
                  <h3 className={`${classes.cardTitle} ${classes.marginTop30}`}>
                    $29
                  </h3>
                  <p>
                    This is good if your company size is between 2 and 10
                    Persons.
                  </p>
                  {action.includes("login") && <Button round color="primary"  onClick={onClickLogin}>{t('Go to')}</Button>}
                  {action.includes("join") && <Button round color="primary"  onClick={onClickJoin}>{t('Join')}</Button>}              
             
                </CardBody>
                 <CardBody team plain>
                      <Typography component="h4">
                           {props.tenant.caption}         
                      </Typography>   
                </CardBody>
            </Card>
        );
 }



 TenantCard.propTypes = {
    tenant: PropTypes.object.isRequired,
    onTenantLogin: PropTypes.func,
    actions: PropTypes.array
};
