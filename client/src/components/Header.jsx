import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import classNames from "classnames";
import Toolbar from "@material-ui/core/Toolbar";

import headerStyle from "assets/jss/components/headerStyle";
import AccountMenuContainer from "containers/menu/AccountMenuContainer";
import Typography from "@material-ui/core/Typography";
import { IconButton } from "@material-ui/core";

class Header extends React.Component {
  componentDidMount() {}

  render() {
    const { classes, color, authenticate, profile } = this.props;
    const appBarClasses = classNames({
      [" " + classes[color]]: color,
    });
    let depName =
      profile.department !== undefined && profile.department !== null
        ? profile.department.name
        : "";
    return (
      <AppBar className={classes.appBar + appBarClasses}>
        <Toolbar className={classes.container}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Open drawer"
          ></IconButton>
          <div className={classes.flex}>
            <Typography variant="button">
              {profile.first_name + " " + profile.last_name}
            </Typography>
            <br />
            <Typography variant="caption" display="block" gutterBottom>
              {profile.position}
            </Typography>
          </div>
          <AccountMenuContainer
            location={this.props.location}
            routes={this.props.routes}
          />
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary","secondary", "info", "success", "warning", "danger"]),
};

export default withStyles(headerStyle)(Header);
