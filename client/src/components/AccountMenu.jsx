import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import Exit from "@material-ui/icons/ExitToApp";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import UserAvatar from "react-user-avatar";
import menuStyle from "assets/jss/components/accountMenuStyle.jsx";
import MenuLinks from "components/MenuLinks";
import { Trans } from "react-i18next";

const WrappedLinks = React.forwardRef((props, ref) => (
  <MenuLinks forwardedRef={ref} {...props} />
));
WrappedLinks.displayName ="WrappedLinks"
class AccountMenu extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogOut = () => {
    this.setState({ anchorEl: null });
    this.props.onLogOut();
  };

  handleLogIn = () => {
    this.setState({ anchorEl: null });
    this.props.onLoginRedirect();
  };
  handleRegister = () => {
    this.setState({ anchorEl: null });
    this.props.onRegisterRedirect();
  };

  handleAccount = () => {
    this.setState({ anchorEl: null });
    this.props.onAccount();
  };

  render() {
    const { profile, routes } = this.props;
    const { anchorEl } = this.state;
    let auth = this.props.authenticate.authenticated;
    const open = Boolean(anchorEl);
    let avatar_url = null;
    if (profile.user_avatar !== undefined && profile.user_avatar !== null) {
      avatar_url = profile.user_avatar.thumb.url;
    }
    return (
      <React.Fragment>
        <IconButton
          aria-owns={open ? "menu-account" : null}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          {avatar_url !== undefined && avatar_url !== null && (
            <UserAvatar size="30" name={profile.name} src={avatar_url} />
          )}
          {!avatar_url && <AccountCircle />}
        </IconButton>

        <Menu
          id="menu-account"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
          onClose={this.handleClose}
          onClick={this.handleClose}
        >
          {!auth && <MenuItem onClick={this.handleLogIn}>Log In</MenuItem>}
          {!auth && (
            <MenuItem onClick={this.handleRegister}>Registration</MenuItem>
          )}
          <WrappedLinks
            profile={profile}
            routes={routes}
            location={this.props.location}
          />
          {auth && (
            <MenuItem onClick={this.handleLogOut}>
              {" "}
              <Exit></Exit> <Trans>Log Out</Trans>
            </MenuItem>
          )}
        </Menu>
      </React.Fragment>
    );
  }
}

AccountMenu.propTypes = {
  profile: PropTypes.object,
  location: PropTypes.object,
  authenticate: PropTypes.object,
  routes: PropTypes.array,
  onLoginRedirect: PropTypes.func.isRequired,
  onLogOut: PropTypes.func.isRequired,
  onAccount: PropTypes.func.isRequired,
  onRegisterRedirect: PropTypes.func
};

export default withStyles(menuStyle)(AccountMenu);
