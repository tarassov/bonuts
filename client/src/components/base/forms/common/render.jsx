import React from "react";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import AutoDownshift from "components/base/downshift/AutoDownshift";
import { placeholder } from "@babel/types";
import { Trans, withTranslation, useTranslation } from "react-i18next";
import classNames from "classnames";

export const renderNumberField = ({
  label,
  input,
  options,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <FormControl className={custom.className}>
    <TextField
      id={label + Math.random().toString()}
      label={label}
      placeholder={label}
      type="number"
      InputLabelProps={{
        shrink: true,
      }}
      error={touched && invalid}
      disabled={options !== undefined ? options.disabled : false}
      {...input}
      {...custom}
    />
    <FormHelperText id={label + "helper-text"} className={custom.className}>
      <Trans>{error}</Trans>
    </FormHelperText>
  </FormControl>
);

export const renderDateField = ({
  label,
  input,
  options,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    id={label + Math.random().toString()}
    label={label}
    placeholder={label}
    type="date"
    error={touched && invalid}
    helperText={touched && error}
    InputLabelProps={{
      shrink: true,
    }}
    disabled={options !== undefined ? options.disabled : false}
    {...input}
    {...custom}
  />
);

export const renderCheckbox = ({
  label,
  input,
  options,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <div>
    <FormControlLabel
      className={custom.className}
      control={
        <Checkbox
          checked={input.value ? true : false}
          onChange={input.onChange}
          disabled={options !== undefined ? options.disabled : false}
        />
      }
      label={label}
      /// classes={{
      //    label: custom.labelClass, // class name, e.g. `classes-nesting-label-x`
      //}}
    />
  </div>
);

export const renderInputWithRange = ({
  label,
  input,
  options,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <FormControl className={custom.className}>
    <Input
      id={label + Math.random().toString()}
      label={label}
      error={touched && invalid}
      placeholder={placeholder} //{label+ ' from ' + custom.min + ' to '+ custom.max}
      value={input.value}
      onChange={input.onChange}
      endAdornment={
        <InputAdornment position="end">{custom.measure}</InputAdornment>
      }
      disabled={options !== undefined ? options.disabled : false}
      {...input}
      {...custom}
      inputProps={{
        "aria-label": { label },
      }}
    />
    <FormHelperText id={label + "helper-text"} className={custom.className}>
      {" "}
      <Trans>{error}</Trans>
    </FormHelperText>
  </FormControl>
);

export const renderDownshift = ({
  label,
  input,
  meta: { touched, invalid, error },
  options,
  classes = {},
  ...custom
}) => (
  <FormControl
    className={classNames({
      [custom.className]: custom.className,
      [classes.formControl]: classes !== undefined,
      [classes.downshiftControl]: classes !== undefined,
    })}
  >
    <AutoDownshift
      id={label + Math.random()}
      label={label}
      placeholder={custom.placeholder}
      error={touched && invalid}
      source={custom.source}
      input={input}
      options={options ? options : {}}
      className={custom.className}
    />
    <FormHelperText id={label + "helper-text"} className={custom.className}>
      <Trans>{error}</Trans>
    </FormHelperText>
  </FormControl>
);
