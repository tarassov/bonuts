import React,{ useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from 'components/base/card/Card';
import invitationCardStyle from 'assets/jss/components/invitationCardStyle'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next';
import CardBody from 'components/base/card/CardBody';
import Button from 'components/base/customButtons/Button';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles(invitationCardStyle);
  


export default function  InviationCard(props) {

    const classes = useStyles();
    const { t } = useTranslation();

    const onClickAccept = useCallback(() => {
         props.onInvitationAccept(props.invitation.id)
      }, [props.invitation]);
     
    const onClickDecline = useCallback(() => {
        props.onInitationDecline(props.invitation.id)
    }, [props.invitation]);

    var action = props.actions ?? ["login"]
    return (
            <Card team raised color="secondary">
                <CardBody team>
                  {props.invitation.tenant.logo.url!==null && <Avatar component='span' className={classes.img} alt="logo" src={props.invitation.tenant.logo.url}/>} 

                  <h3 className={`${classes.cardTitle} ${classes.marginTop10}`}>
                  {props.invitation.tenant.caption}
                  </h3>
                  {action.includes("accept") && <Button round color="primary"  onClick={onClickAccept}>{t('Accept')}</Button>}
                  {action.includes("join") && <Button round color="primary"  onClick={onClickDecline}>{t('Decline')}</Button>}              
                </CardBody>      
            </Card>
        );
 }



 TenantCard.propTypes = {
    invitation: PropTypes.object.isRequired,
    onInvitationAccept: PropTypes.func,
    onInitationDecline: PropTypes.func,
    actions: PropTypes.array
};
