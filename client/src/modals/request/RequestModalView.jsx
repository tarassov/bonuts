import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import modalStyle from "assets/jss/modals/modalStyle";
import { Trans } from "react-i18next";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import ReactToPrint from "react-to-print";
import { QRCode } from "react-qr-svg";
import GridItem from "components/base/grid/GridItem.jsx";
import GridContainer from "components/base/grid/GridContainer.jsx";

class RequestModalView extends React.Component {
  render() {
    const { body, classes } = this.props;
    return (
      <React.Fragment>
        <div ref={(el) => (this.componentRef = el)}>
          <DialogTitle id="modal_dialog">
            <Trans>Your request: </Trans> <Trans>{body.title}</Trans>
          </DialogTitle>
          <DialogContent className={classes.root}>
            <GridContainer>
              <GridItem xs={6} sm={6} md={6}>
                <h3>
                  <Trans>Employee</Trans>:{body.name}
                </h3>
                <h3>
                  <Trans>Request code</Trans>: {body.public_uid || body.id}
                </h3>
              </GridItem>
              <GridItem xs={6} sm={6} md={6}>
                <QRCode
                  bgColor="#FFFFFF"
                  fgColor="#000000"
                  level="Q"
                  style={{ width: 140 }}
                  value={body.public_uid || body.id}
                />
              </GridItem>
            </GridContainer>
          </DialogContent>
        </div>
        <DialogActions>
          <ReactToPrint
            trigger={() => (
              <Button onClick={this.accept} color="primary" autoFocus>
                Print{" "}
              </Button>
            )}
            content={() => this.componentRef}
          />
          <Button onClick={this.props.onCloseModal} color="secondary">
            Close
          </Button>
        </DialogActions>
      </React.Fragment>
    );
  }
}
RequestModalView.propTypes = {
  classes: PropTypes.object.isRequired,
  uid: PropTypes.string,
  title: PropTypes.string,
};

export default withStyles(modalStyle)(withMobileDialog()(RequestModalView));
