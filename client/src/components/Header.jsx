import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import classNames from "classnames";
import Toolbar from '@material-ui/core/Toolbar';
import {PopoverAnimationVertical} from '@material-ui/core/Popover';
import headerStyle from "assets/jss/components/headerStyle"
import AccountMenuContainer from 'containers/menu/AccountMenuContainer'


class Header extends React.Component {
    render() {
        const { classes, color,authenticate,profile } = this.props;
        let auth = authenticate.authenticated;
        const appBarClasses = classNames({
            [" " + classes[color]]: color
        });
        if (auth){
            return (
                <AppBar className={classes.appBar + appBarClasses}>
                    <Toolbar className={classes.container}>
                        <div className={classes.flex}>
                            {profile.username}
                        </div>
                        <AccountMenuContainer/>
                    </Toolbar>
                </AppBar>

            )}
        else {
            return(<React.Fragment/>)
        }

    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

export default withStyles(headerStyle) (Header)
