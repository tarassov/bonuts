import React, { Component } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/base/customButtons/RegularButton";
import { Field, reduxForm } from "redux-form";

import formStyle from "assets/jss/components/base/formStyle";
import { renderTextField } from "components/base/forms/reduxForm/text";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(formStyle);
function RecoverForm(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <form onSubmit={props.handleSubmit} className={classes.container}>
      <Field
        name="email"
        id="recover_email"
        label={t("email")}
        component={renderTextField}
        type="email"
        autoComplete="off"
        className={classes.textField}
      />
      <br />
      <Button type="submit" className={classes.buttonWhite} color="primary">
        {t("Change password")}
      </Button>
    </form>
  );
}

RecoverForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default reduxForm({
  // a unique name for the form
  form: "recover",
})(RecoverForm);
