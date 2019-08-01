import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import classNames from "classnames";

const style = {
  grid: {
    padding: "0 15px 15px !important",

  }
};

function GridItem({ ...props }) {
  const { classes, children, className,...rest } = props;
  const classItem = classNames({[classes.grid]:true, [className]:className})
  return (
    <Grid item {...rest} className={classItem}>
      {children}
    </Grid>
  );
}

export default withStyles(style)(GridItem);
