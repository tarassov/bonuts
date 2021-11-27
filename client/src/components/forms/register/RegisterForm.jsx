import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import asyncValidate from "./asyncValidate";
import registerFormStyle from "assets/jss/components/registerFormStyle";
import { renderTextField } from "components/base/forms/reduxForm/text";

import { withTranslation, Trans } from "react-i18next";

const FORM_NAME = "RegisterForm";

const validate = (values) => {
  const errors = {};
  const requiredFields = ["first_name", "last_name", "email", "password"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  return errors;
};

const radioButton = ({ input, ...rest }) => (
  <FormControl>
    <RadioGroup {...input} {...rest}>
      <FormControlLabel value="female" control={<Radio />} label="Female" />
      <FormControlLabel value="male" control={<Radio />} label="Male" />
    </RadioGroup>
  </FormControl>
);

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return;
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>;
  }
};

class RegisterForm extends Component {
  onReset() {
    this.props.onReset();
    this.props.reset();
  }
  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      classes,
      authenticate,
    } = this.props;
    if (authenticate.registered && !authenticate.confirmed) {
      return (
        <div>
          <Typography
            variant="h6"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            <Trans>Confirmation email was sent to</Trans> {authenticate.email}
          </Typography>
        </div>
      );
    } else {
      return (
        <form onSubmit={handleSubmit} className={classes.container}>
          <div>
            <Field
              name="first_name"
              component={renderTextField}
              label="First Name"
              className={classes.textField}
            />
          </div>
          <div>
            <Field
              name="last_name"
              component={renderTextField}
              label="Last Name"
              className={classes.textField}
            />
          </div>
          <div>
            <Field
              name="email"
              component={renderTextField}
              label="Email"
              className={classes.textField}
            />
          </div>

          <div>
            <Field
              name="password"
              component={renderTextField}
              label="Password"
              type="password"
              className={classes.textField}
            />
          </div>
          <br />
          <Button
            type="submit"
            disabled={pristine || submitting}
            className={classes.button}
            color="primary"
          >
            Submit
          </Button>
          <Button
            type="button"
            disabled={pristine || submitting}
            onClick={this.onReset.bind(this)}
            className={classes.button}
          >
            Clear Values
          </Button>
        </form>
      );
    }
  }
}

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

RegisterForm = reduxForm({
  form: FORM_NAME, // a unique identifier for this form
  validate,
  asyncValidate,
})(RegisterForm);

export default withStyles(registerFormStyle)(withTranslation()(RegisterForm));
