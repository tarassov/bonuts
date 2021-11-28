import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/base/card/Card";
import invitationCardStyle from "assets/jss/components/invitationCardStyle";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import CardBody from "components/base/card/CardBody";
import Button from "components/base/customButtons/RegularButton";
import { Avatar } from "@material-ui/core";
import logo_sm from "assets/img/bonuts_sm.svg";

const useStyles = makeStyles(invitationCardStyle);

export default function InvitationCard(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  const [imagePreviewUrl, setImagePreviewUrl] = React.useState(
    props.invitation.logo.url ? props.invitation.logo.url : logo_sm
  );

  const onClickAccept = useCallback(() => {
    props.onInvitationAccept(props.invitation.id, props.invitation.name);
  }, [props.invitation]);

  const onClickDecline = useCallback(() => {
    props.onInvitationDecline(props.invitation.id);
  }, [props.invitation]);

  return (
    <Card team raised color="secondary">
      <CardBody team>
        <Avatar
          component="span"
          className={classes.img}
          alt="logo"
          src={imagePreviewUrl}
        />

        <h3 className={`${classes.cardTitle} ${classes.marginTop10}`}>
          {props.invitation.caption}
        </h3>
        <Button transparent color="secondary" onClick={onClickAccept}>
          {t("Accept")}
        </Button>
        <Button transparent color="secondary" onClick={onClickDecline}>
          {t("Decline")}
        </Button>
      </CardBody>
    </Card>
  );
}

InvitationCard.propTypes = {
  invitation: PropTypes.object.isRequired,
  onInvitationAccept: PropTypes.func,
  onInvitationDecline: PropTypes.func,
};
