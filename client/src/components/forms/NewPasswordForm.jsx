import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "components/base/customButtons/RegularButton";
import { Field, reduxForm } from "redux-form";
import formStyle from "assets/jss/components/base/formStyle";
import { renderTextField } from "components/base/forms/reduxForm/text";
import { withTranslation, Trans } from "react-i18next";

class NewPasswordForm extends Component {
  render() {
    const { classes, t } = this.props;
    return (
      <form onSubmit={this.props.handleSubmit} className={classes.container}>
        <Field
          name="new_password"
          id="new_password"
          label={t("new password")}
          component={renderTextField}
          type="password"
          autoComplete="off"
          className={classes.textField}
        />
        <br />
        <Button type="submit" className={classes.textField} color="primary">
          <Trans>Change password</Trans>
        </Button>
      </form>
    );
  }
}

NewPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};



export default withStyles(formStyle)(withTranslation()(reduxForm({
  // a unique name for the form
  form: "recover",
})(NewPasswordForm)));
