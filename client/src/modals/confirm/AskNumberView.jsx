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

import TextField from "@material-ui/core/TextField";

class AskNumberView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let value = this.state.value;
    this.props.onAccept(value);
  }

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
        <form
          onSubmit={this.handleSubmit}
          className={classes.root}
          noValidate
          autoComplete="off"
        >
          <DialogContent className={classes.container}>
            {body}
            <TextField
              autoFocus
              margin="dense"
              id="number_value"
              value={this.state.value}
              onChange={this.handleChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="primary" autoFocus>
              <Trans>OK</Trans>
            </Button>
            <Button onClick={this.cancel} color="secondary">
             <Trans>Close</Trans>
            </Button>
          </DialogActions>
        </form>
      </React.Fragment>
    );
  }
}
AskNumberView.propTypes = {
  classes: PropTypes.object.isRequired,
  body: PropTypes.object.isRequired,
  onAccept: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default withStyles(modalStyle)(withMobileDialog()(AskNumberView));
