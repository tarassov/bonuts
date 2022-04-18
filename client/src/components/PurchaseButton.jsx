import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Trans } from "react-i18next";
import Button from "@material-ui/core/Button";
const styles = (theme) => ({
  smallButton: {
    fontSize: "smaller",
    height: 20,
    marginTop: 5,
  },
});

function PurchaseButton(props) {
  const { classes, onClick, refund } = props;

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="secondary"
        className={classes.smallButton}
        onClick={onClick}
      >
        {!refund && <Trans>Purchase</Trans>}
        {refund && <Trans>Refund</Trans>}
      </Button>
    </React.Fragment>
  );
}

export default withStyles(styles)(PurchaseButton);
