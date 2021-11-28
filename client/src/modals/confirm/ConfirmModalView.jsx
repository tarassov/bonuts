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

class ConfirmModalView extends React.Component {
  componentDidMount() {}

  accept = (e) => {
    e.preventDefault();
    this.props.onAccept();
  };

  cancel = (e) => {
    e.preventDefault();
    this.props.onCancel();
  };

  render() {
    const { classes, body } = this.props;
    return (
      <React.Fragment>
        <DialogTitle id="modal_dialog">
          <Trans>Confirmation dialog</Trans>
        </DialogTitle>
        <DialogContent className={classes.root}>{body}</DialogContent>
        <DialogActions>
          <Button onClick={this.accept} color="primary" autoFocus>
            Submit
          </Button>
          <Button onClick={this.cancel} color="secondary">
            Close
          </Button>
        </DialogActions>
      </React.Fragment>
    );
  }
}
ConfirmModalView.propTypes = {
  classes: PropTypes.object.isRequired,
  body: PropTypes.object.isRequired,
  onAccept: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default withStyles(modalStyle)(withMobileDialog()(ConfirmModalView));
