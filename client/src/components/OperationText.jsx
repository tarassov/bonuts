import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { Trans } from "react-i18next";
import ProfileButton from "./ProfileButton";
import Grid from "@material-ui/core/Grid";
import {
  successColor,
  dangerColor,
  primaryColor,
} from "assets/jss/baseStyles.jsx";
import PurchaseButton from "./PurchaseButton";

const style = (theme) => ({
  operationText: {
    display: "inline-flex",
    margin: "auto 2px",
    padding: 2,
    whiteSpace: "pre-wrap" /* css-3 */,
    wordBreak: "break-word",
  },
  amountText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  plusText: {
    color: primaryColor[1],
  },
  minusText: {
    color: dangerColor[1],
  },
  operationContainer: {
    padding: 0,
    margin: 0,
  },
});

function OperationText(props) {
  const {
    classes,
    operation,
    onToProfileClick,
    onFromProfileClick,
    receiver,
    sender,
    onPurchaseClick,
  } = props;

  const amountClass = classNames({
    [classes.operationText]: true,
    [classes.amountText]: true,
    [classes.plusText]: operation && operation.direction > 0,
    [classes.minusText]: operation && operation.direction < 0,
  });
  let to_profile;
  let from_profile;
  if (operation !== null && operation !== undefined) {
    if (operation.to_profile !== undefined) {
      to_profile = { ...operation.to_profile, user_name: operation.to_user_name };
    }
    if (operation.from_profile !== undefined) {
      from_profile = {
        ...operation.from_profile,
        user_name: operation.from_user_name,
      };
    }
  }

  const toProfileClick = () => {
    onToProfileClick(operation);
  };
  const fromProfileClick = () => {
    onFromProfileClick(operation);
  };
  const purchaseClick = () => {
    onPurchaseClick(operation);
  };
  return (
    <React.Fragment>
      {operation !== undefined && operation !== null && (
        <Grid container className={classes.operationContainer}>
          <span className={amountClass}>
            {" "}
            {operation.direction === 1 ? "+" : ""}
            {operation.amount}{" "}
          </span>
          {receiver &&
            operation.to_profile !== undefined &&
            operation.to_profile !== undefined &&
            operation.to_profile !== null && (
              <React.Fragment>
                <span className={classes.operationText}>
                  {" "}
                  <Trans>for</Trans>{" "}
                </span>
                <ProfileButton profile={to_profile} onClick={toProfileClick} />
              </React.Fragment>
            )}
          {sender &&
            operation.from_profile !== undefined &&
            operation.from_profile !== null && (
              <React.Fragment>
                <span className={classes.operationText}>
                  {" "}
                  <Trans>from</Trans>{" "}
                </span>
                <ProfileButton
                  profile={from_profile}
                />
              </React.Fragment>
            )}
          {operation.created_at !== undefined &&
            operation.created_at !== null && (
              <span className={classes.operationText}>
                {operation.created_at}
              </span>
            )}
          {(operation.deal_type == "buy" || operation.deal_type == "refund_request") && (
            <PurchaseButton onClick={purchaseClick}  refund={operation.deal_type == "refund_request"}/>
          )}
        </Grid>
      )}
    </React.Fragment>
  );
}

OperationText.propTypes = {
  onToProfileClick: PropTypes.func,
  onFromProfileClick: PropTypes.func,
  onPurchaseClick: PropTypes.func,
};

export default withStyles(style)(OperationText);
