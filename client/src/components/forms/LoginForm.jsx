import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Field, reduxForm } from "redux-form";
import formStyle from "assets/jss/components/base/formStyle";
import { renderTextField } from "components/base/forms/reduxForm/text";
import { withTranslation, Trans } from "react-i18next";

class LoginForm extends Component {
  render() {
    const { classes } = this.props;

    return (
      <form onSubmit={this.props.handleSubmit} className={classes.container}>
        <Field
          name="username"
          component={renderTextField}
          label="Username"
          placeholder="your email"
          className={classes.textField}
          id="username"
        />
        <br />
        <Field
          name="password"
          id="password"
          label="Password"
          component={renderTextField}
          type="password"
          autoComplete="current-password"
          className={classes.textField}
        />
        <br />
        <Button type="submit" className={classes.button} color="primary">
          <Trans>Log in</Trans>
        </Button>
        <Button
          className={classes.button}
          onClick={this.props.recoverToggle}
          color="secondary"
        >
          <Trans>Recover password</Trans>
        </Button>
      </form>
    );
  }
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};



export default withStyles(formStyle)(withTranslation()( reduxForm({
  form: "login",
})(LoginForm)));
