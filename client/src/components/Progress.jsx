import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  progress: {
    // margin: theme.spacing.unit * 2,
    color: theme.palette.primary["A400"],
    margin: "auto",
    height: "200px",
  },
  center: {
    margin: "auto",
    display: "flex",
    height: "200px",
    flexDirection: "column",
    alignItems: "center",
  },
  caption: {
    color: theme.palette.primary["A400"],
  },
});

function Progress(props) {
  const { classes } = props;
  return (
    <div className={classes.center}>
      <CircularProgress className={classes.progress} />
      <Typography type="Subheading" className={classes.caption}>
        {props.waitingText}
      </Typography>
    </div>
  );
}

Progress.propTypes = {
  classes: PropTypes.object.isRequired,
  waitingText: PropTypes.string,
};

export default withStyles(styles)(Progress);
