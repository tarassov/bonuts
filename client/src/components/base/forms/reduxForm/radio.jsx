import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import FormHelperText from "@material-ui/core/FormHelperText";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import { Trans, withTranslation, useTranslation } from "react-i18next";
import classNames from "classnames";

import radiGroupStyle from "assets/jss/components/base/radioGroupStyle";

const useStyles = makeStyles(radiGroupStyle);

// Inspired by blueprintjs
function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

export const renderRadio = ({
  label,
  id,
  input,
  meta: { touched, invalid, error },
  options,
  classes = {},
  ...custom
}) => (
  <FormControl
    className={classNames({
      [custom.className]: custom.className,
    })}
  >
    <FormLabel component="legend">{label}</FormLabel>
    <RadioGroup
      aria-label={"quiz" + id}
      name="quiz"
      value={custom.value}
      onChange={input.onChange}
    >
      {custom.source.map((item) => {
        return (
          <FormControlLabel
            key={id + "/" + item.value}
            value={item.value}
            control={<StyledRadio />}
            label={item.text}
            disabled={item.disabled}
          />
        );
      })}
    </RadioGroup>
    <FormHelperText id={label + "helper-text"} className={custom.className}>
      <Trans>{error}</Trans>
    </FormHelperText>
  </FormControl>
);
