import React, {  } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/base/card/Card";
import CardActions from "@material-ui/core/CardActions";
import CardBody from "components/base/card/CardBody";
import Button from "components/base/customButtons/RegularButton";
import Typography from "@material-ui/core/Typography";
import { card } from "assets/jss/baseStyles";
import CakeIcon from "@material-ui/icons/Cake";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

const styles = (theme) => ({
  card: {
   // ...card,
    minWidth: "275px",
    margin: 5,
  },
  content: {
    paddingBottom: 3,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 3,
    fontSize: 13,
  },
  noMargin: {
    margin: 0,
    padding: 0,
  },
  leftIcon: {
    marginRight: theme.spacing(2),
  },
  rightIcon: {
    marginLeft: theme.spacing(2),
  },
  iconSmall: {
    fontSize: 20,
  },
});

const useStyles = makeStyles(styles);
export default function AccountBalance(props) {
  const { title, lastOperation, balance, shareable, shopable, profile } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  let lastAmountName = "";
  if (lastOperation !== undefined && lastOperation !== null) {
    if (shareable) {
      lastAmountName = t("donut", { count: lastOperation.amount });
    } else {
      lastAmountName = t("point", { count: lastOperation.amount });
    }
  }
  return (
    <Card raised color="secondaryLight" className={classes.card}>
      <CardBody className={classes.content}>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {t(title)}
        </Typography>
        <Typography variant="h5">
          {balance} {shareable && t("donut", { count: balance })}
          {shopable && t("point", { count: balance })}
        </Typography>
        <Button simple className={classNames(classes.noMargin)}>
          {lastOperation !== undefined && lastOperation !== null && (
            <Typography
              className={classes.pos}
              color="textSecondary"
              onClick={props.onHistory.bind(this, profile)}
            >
              {lastOperation.direction}
              {lastOperation.amount} {lastAmountName} {lastOperation.date}
            </Typography>
          )}
        </Button>
      </CardBody>
      <CardActions>
        {balance > 0 && shareable && (
          <Button
            color="primary"
            className={classes.noMargin}
            onClick={props.onShare}
          >
            {t("Share")}
            <CakeIcon
              className={classNames(classes.rightIcon, classes.iconSmall)}
            />
          </Button>
        )}
        {balance > 0 && shopable && (
          <Button
            color="primary"
            className={classes.noMargin}
            onClick={props.onRedirectToStore}
          >
            {t("Go to shop")}
            <LocalMallIcon
              className={classNames(classes.rightIcon, classes.iconSmall)}
            />
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

AccountBalance.propTypes = {
  classes: PropTypes.object,
  onShare: PropTypes.func,
  onHistory: PropTypes.func,
  onRedirectToStore: PropTypes.func,
  getBalance: PropTypes.func.isRequired,
  lastOperation: PropTypes.object,
  title: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired,
  balance: PropTypes.number.isRequired,
  shareable: PropTypes.bool.isRequired,
  shopable: PropTypes.bool.isRequired,
  lastUpdate: PropTypes.string,
};
