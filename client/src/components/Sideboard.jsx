import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from "@material-ui/core/Hidden";
import Icon from "@material-ui/core/Icon";
import { NavLink } from "react-router-dom";
import logo from "assets/img/donut.svg";
import IconButton from '@material-ui/core/IconButton';

import sideboardStyle from "assets/jss/components/sideboardStyle"
import { withTranslation, Trans } from "react-i18next";
import MenuLinks from './MenuLinks';//

class Sideboard extends React.Component {
    state = {
        open: this.props.open,
    };
    handleDrawerOpen = () => {
      this.setState({ open: true });
      this.props.handleDrawerOpen();
    };

    handleDrawerClose = () => {
      this.setState({ open: false });
      this.props.handleDrawerClose();
    };

    toggle =() => {
      if (this.state.open){
        this.handleDrawerClose()
      }
      else {
        this.handleDrawerOpen()
      }
    }

    render(){
      const {classes} = this.props;
      let auth = this.props.authenticate.authenticated;
      var brand = (
        <div className={classes.logo}>
          <a
            href="#"
            className={classes.logoLink}
            onClick={this.toggle}
          >
            <div className={classes.logoImage}>
              <img src={logo} alt="logo" className={classes.img} />
            </div>
             Do Nuts
          </a>
        </div>
      );

      return (
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
            }}
            open={this.state.open}
          >
              {brand}
            <div className={classNames(classes.toolbarIcon)}>
              <IconButton onClick={this.handleDrawerClose} className={classNames(!this.state.open && classes.hidden)}>
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton,this.state.open && classes.hidden,)}
              >
                <MenuIcon />
              </IconButton>
            </div>
            <Divider />
            <div className={classes.sidebarWrapper}>
              <MenuLinks {...this.props}/>
            </div>
          </Drawer>
        </Hidden>
        )
    }
}

export default withStyles(sideboardStyle)(withTranslation("translations")(Sideboard))
