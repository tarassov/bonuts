import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import tenantCardStyle from 'assets/jss/components/tenantCardStyle'
import PropTypes from 'prop-types'
import { Link } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(tenantCardStyle);
  


export default function  TenantCard(props) {

    const classes = useStyles();
    const { t, i18n } = useTranslation();

      return (
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                      <Typography component="h4">
                           {props.tenant}         
                      </Typography>   
                </CardContent>
                <CardActions className={classes.actions}>
                    <Link  href="#" onClick={props.onClick}>{t('Go to')}</Link>
                </CardActions>
            </Card>
        );
 }



 TenantCard.propTypes = {
    tenant: PropTypes.string.isRequired,
    onClick: PropTypes.func
};