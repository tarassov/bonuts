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
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Icon from "@material-ui/core/Icon";
import { NavLink } from "react-router-dom";

import IconButton from '@material-ui/core/IconButton';

import sideboardStyle from "assets/jss/components/sideboardStyle"
import { withTranslation, Trans } from "react-i18next";

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

    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
    }

    getLinks = () => {
        const {classes,routes,color} = this.props;
        console.log(routes)
        return (
            <List className={classes.list}>
              {routes.map((prop, key) => {
                      if (prop.redirect || !prop.authenticated || prop.hideInMenu || prop.sidebarName ===undefined) return null;
                      const listItemClasses = classNames({[" " + classes[color]]: this.activeRoute(prop.path)});
                      const whiteFontClasses = classNames({[" " + classes.whiteFont]: this.activeRoute(prop.path)});
                          return (
                              <NavLink
                                to={prop.path}
                                className={classes.item}
                                activeClassName="active"
                                key={key}
                              >
                                <ListItem button className={classes.itemLink + listItemClasses}>
                                  <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                                    {typeof prop.icon === "string" ? (
                                      <Icon>{prop.icon}</Icon>
                                    ) : (
                                      <prop.icon />
                                    )}
                                  </ListItemIcon>
                                  <ListItemText
                                    className={classes.itemText + whiteFontClasses}
                                    disableTypography={true}
                                  >
                                      <Trans>{prop.sidebarName}</Trans>
                                  </ListItemText>
                                </ListItem>
                              </NavLink>
                          )
              })}
            </List>
          )
    }


    render(){
      const {classes} = this.props;
      let auth = this.props.authenticate.authenticated;

      return (
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
            }}
            open={this.state.open}
          >
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
            <div className={classes.sidebarWrapper}>{this.getLinks()}</div>
          </Drawer>
        )
    }
}

export default withStyles(sideboardStyle)(withTranslation("translations")(Sideboard))
