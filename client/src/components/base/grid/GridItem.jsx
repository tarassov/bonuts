import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import classNames from "classnames";

const style = {
  grid: {
    padding: "0 15px 15px !important",
  },
};

const useStyles = makeStyles(style);

export default function GridItem({ ...props }) {
  const { children, className, ...rest } = props;
  const classes = useStyles();

  const classItem = classNames({
    [classes.grid]: true,
    [className]: className,
  });
  return (
    <Grid item {...rest} className={classItem}>
      {children}
    </Grid>
  );
}
