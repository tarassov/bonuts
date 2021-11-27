import React from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import { Trans } from "react-i18next";
import classNames from "classnames";

export const renderTextField = ({
  label,
  input,
  light,
  options,
  legend,
  meta: { touched, invalid, error },
  classes = {},
  ...custom
}) => (
  <FormControl
    className={classNames({
      [custom.className]: true,
      [classes.formControl]: true,
    })}
  >
    {legend && <FormLabel component="legend">{legend}</FormLabel>}
    <TextField
      id={label + Math.random().toString()}
      label={label}
      error={touched && invalid}
      {...input}
      {...custom}
      disabled={options !== undefined ? options.disabled : false}
    />

    <FormHelperText id={label + "helper-text"} className={custom.className}>
      <Trans>{error}</Trans>
    </FormHelperText>
  </FormControl>
);
