import React, { Component } from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import withMobileDialog from "@material-ui/core/withMobileDialog";

class DialogWindow extends Component {
  handleClose() {
    this.props.onClose();
  }

  render() {
    const { open, fullScreen } = this.props;
    return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={this.handleClose.bind(this)}
        aria-labelledby="responsive-dialog-title"
        fullWidth={true}
        scroll="body"
      >
        {this.props.children}
      </Dialog>
    );
  }
}

DialogWindow.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default withMobileDialog()(DialogWindow);
