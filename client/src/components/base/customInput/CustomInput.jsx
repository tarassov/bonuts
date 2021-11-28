import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

import Datetime from "react-datetime";

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import styles from "assets/jss/components/base/customInputStyle";

// @ts-ignore
const useStyles = makeStyles(styles);

export default function CustomInput(props) {
  const classes = useStyles();
  const {
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    white,
    inputRootCustomClasses,
    success,
    helperText,
    rtlActive,    
  } = props;


  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error,
    [classes.labelRTL]: rtlActive,
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
    [classes.whiteUnderline]: white,
  });
  const marginTop = classNames({
    [inputRootCustomClasses]: inputRootCustomClasses !== undefined,
  });
  const inputClasses = classNames({
    [classes.input]: true,
    [classes.whiteInput]: white,
  });
  var formControlClasses;

  if (formControlProps !== undefined) {
    formControlClasses = classNames({
      [formControlProps.className]:true,
      [classes.formControl]:true,
      [classes.formControlDate]: inputProps !==undefined && inputProps.type=="date"
    });
  } else {
    formControlClasses = classNames({
      [classes.formControl]:true,
      [classes.formControlDate]: inputProps !==undefined && inputProps.type=="date"
    });
  }
  var helpTextClasses = classNames({
    [classes.labelRootError]: error,
    [classes.labelRootSuccess]: success && !error,
  });
  let newInputProps = {
    maxLength:
      inputProps && inputProps.maxLength ? inputProps.maxLength : undefined,
    minLength:
      inputProps && inputProps.minLength ? inputProps.minLength : undefined,
    step: inputProps && inputProps.step ? inputProps.step : undefined,
    disabled: inputProps && inputProps.disabled ? inputProps.disabled : false,
    placeholder: inputProps && inputProps.placeholder ? inputProps.placeholder: undefined
  };
  return (
    <FormControl {...formControlProps} className={formControlClasses}>
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + " " + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
       {(inputProps ===undefined || inputProps.type !="date") && <Input
        classes={{
          input: inputClasses,
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses,          
        }}
        id={id}
        {...inputProps}
        inputProps={newInputProps}
      />}
       {inputProps !==undefined && inputProps.type=="date" &&  <Datetime
                    timeFormat={false}
                    classes={{
                      input: inputClasses,
                      root: marginTop,
                      disabled: classes.disabled,
                      underline: underlineClasses,          
                    }}
                    id={id}
                    {...inputProps}                    
                    className = "datepicker"
                    inputProps={newInputProps}
      />} 
      {helperText !== undefined ? (
        <FormHelperText id={id + "-text"} className={helpTextClasses}>
          {helperText}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
}

CustomInput.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  inputRootCustomClasses: PropTypes.string,
  error: PropTypes.bool,
  date: PropTypes.bool,
  success: PropTypes.bool,
  white: PropTypes.bool,
  helperText: PropTypes.node,
  rtlActive: PropTypes.bool,
};
