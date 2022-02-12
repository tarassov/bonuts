import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Field, reduxForm } from "redux-form";
import formStyle from "assets/jss/components/base/formStyle";
import { renderTextField } from "components/base/forms/reduxForm/text";
import { Trans } from "react-i18next";

class ShareAllForm extends Component {
  render() {
    const { classes, t } = this.props;
    return (
      <form onSubmit={this.props.handleSubmit} className={classes.container}>
        <Field
          name="share_all"
          id="share_all"
          label={t("points")}
          component={renderTextField}
          autoComplete="off"
          rows="4"
          multiline
          className={classes.textField}
        />
        <br />
        <Button type="submit" className={classes.button} color="primary">
          <Trans>Send points</Trans>
        </Button>
      </form>
    );
  }
}

ShareAllForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

ShareAllForm = reduxForm({
  // a unique name for the form
  form: "activateRequest",
})(ShareAllForm);
