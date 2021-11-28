import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/base/card/Card";
import tenantCardStyle from "assets/jss/components/tenantCardStyle";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import CardBody from "components/base/card/CardBody";
import Button from "components/base/customButtons/RegularButton";
import { Avatar } from "@material-ui/core";
import logo_sm from "assets/img/bonuts_sm.png";

const useStyles = makeStyles(tenantCardStyle);

export default function TenantCard(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  const [imagePreviewUrl, setImagePreviewUrl] = React.useState(
    props.tenant.logo.url ? props.tenant.logo.url : logo_sm
  );

  const onClickLogin = useCallback(() => {
    props.onTenantLogin(props.tenant.name);
  }, [props.tenant]);

  const onClickJoin = useCallback(() => {
    props.onTenantJoin(props.tenant.name);
  }, [props.tenant]);

  var action = props.actions ?? ["login"];
  return (
    <Card team raised color="secondary" className={classes.cardHover}>
      <CardBody team>
        <div className={classes.cardHeaderHover}>
          <Avatar
            component="span"
            className={classes.img}
            alt="logo"
            src={imagePreviewUrl}
          />
        
        <h3 className={`${classes.cardTitle} ${classes.marginTop10}`}>
          {props.tenant.caption}
        </h3>
        </div>
        {action.includes("login") && (
          <Button color="primary" onClick={onClickLogin}>
            {t("Go to")}
          </Button>
        )}
        {action.includes("join") && (
          <Button color="primary" onClick={onClickJoin}>
            {t("Join")}
          </Button>
        )}
      </CardBody>
    </Card>
  );
}

TenantCard.propTypes = {
  tenant: PropTypes.object.isRequired,
  onTenantLogin: PropTypes.func,
  actions: PropTypes.array,
};
