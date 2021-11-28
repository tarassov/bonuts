import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Zoom from "@material-ui/core/Zoom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = (theme) => ({
  fabsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
});

function Fabs(props) {
  const { classes, fabs, theme } = props;

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (
    <div className={classes.fabsContainer}>
      {fabs.map((fab, index) => (
        <Zoom
          key={index}
          in={true}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${0}ms`,
          }}
          unmountOnExit
        >
          <Button
            variant="extendedFab"
            className={fab.className}
            color={fab.color}
            onClick={fab.onClick}
          >
            {fab.icon}
            {fab.caption}
          </Button>
        </Zoom>
      ))}
    </div>
  );
}

Fabs.propTypes = {
  classes: PropTypes.object.isRequired,
  fabs: PropTypes.array,
};

export default withStyles(styles, { withTheme: true })(Fabs);
