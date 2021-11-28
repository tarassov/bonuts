import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles/index";
import styles from "../../assets/jss/styles";

class ValueDialog extends React.Component {
  state = {
    name: this.props.initial,
  };

  textChanged = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleOk = () => {
    this.props.onSubmit(this.state.name);
    this.setState({ name: "" });
    this.handleClose();
  };

  handleClose = () => {
    this.props.onClose();
  };

  handleCancel = () => {
    if (this.props.onCancel) {
      this.props.onCancel;
    }
    this.handleClose();
  };

  submit(event) {
    event.preventDefault();
    this.handleOk();
  }

  render() {
    const { classes, label, title, description } = this.props;

    return (
      <React.Fragment>
        <DialogTitle id="form-dialog-title"> {title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
          <form
            className={classes.inlineBlock}
            onSubmit={this.submit.bind(this)}
          >
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label={label}
              onChange={this.textChanged("name")}
              value={this.state.name}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleOk} color="primary">
            Ok
          </Button>
        </DialogActions>
      </React.Fragment>
    );
  }
}

ValueDialog.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  initial: PropTypes.string,
};

export default withStyles(styles)(ValueDialog);
