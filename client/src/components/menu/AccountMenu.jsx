import React from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
import Exit from "@material-ui/icons/ExitToApp";
import Menu  from '@material-ui/core/Menu';
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

import appRoutes from "routes/appRoutes.jsx";
import menuStyle from "assets/jss/components/accountMenuStyle.jsx";
import MenuLinks from "components/MenuLinks";
import { withTranslation, Trans } from "react-i18next";

class AccountMenu extends React.Component {
    state = {
        auth: true,
        anchorEl: null,
    };

    handleChange = (event, checked) => {
        this.setState({ auth: checked });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };


    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleLogOut = () => {
        this.setState({ anchorEl: null });
        this.props.onLogOut()
    }

    handleLogIn = () => {
        this.setState({ anchorEl: null });
        this.props.onLoginRedirect()
    }
    handleRegister = () => {
        this.setState({ anchorEl: null });
        this.props.onRegisterRedirect()
    }

    handleAccount =() => {
        this.setState({ anchorEl: null });
        this.props.onAccount()
    }

    render() {
        const { classes } = this.props;
        const {anchorEl } = this.state;
        console.log("Account menu");
        console.log(this.props);
        let auth = this.props.authenticate.authenticated;
        const open = Boolean(anchorEl);


        return (
            <React.Fragment>
                <IconButton
                    aria-owns={open ? 'menu-account' : null}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <ClickAwayListener onClickAway={this.handleClose}>
                    <Menu
                        id="menu-account"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={this.handleClose}
                        onClick={this.handleClose}
                    >
                        {!auth && (<MenuItem onClick={this.handleLogIn}>Log In</MenuItem>)}
                        {!auth && (<MenuItem onClick={this.handleRegister}>Registration</MenuItem>)}
                         <MenuLinks routes={appRoutes} location={this.props.location}/>
                        {auth && (<MenuItem onClick={this.handleLogOut}> <Exit></Exit> <Trans>Log Out</Trans></MenuItem>)}
                    </Menu>
                </ClickAwayListener>
            </React.Fragment>
        )
    }
}


AccountMenu.propTypes = {
    onLoginRedirect: PropTypes.func.isRequired,
    onLogOut: PropTypes.func.isRequired,
    onAccount: PropTypes.func.isRequired,
}

export default withStyles(menuStyle)(AccountMenu);
