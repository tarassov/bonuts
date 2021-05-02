import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from "@material-ui/core/Icon";
import { NavLink } from "react-router-dom";
import { withTranslation, Trans } from "react-i18next";
import sideboardStyle from "assets/jss/components/sideboardStyle"


class MenuLinks extends React.Component {
    activeRoute(routeName) {
      return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
    }

    render() {
        const {classes,routes,color,profile} = this.props;
         return (
            <List className={classes.list}>
              {routes.map((route, key) => {                      
                      if (route.config.redirect || 
                        !route.config.authenticated || 
                        route.config.hideInMenu || 
                        route.config.sidebarName ===undefined ||
                        (route.config.admin && !profile.admin) ||
                        (route.config.store_admin && !profile.admin && !profile.store_admin)
                        ) return null;
                      const listItemClasses = classNames({[" " + classes[color]]: this.activeRoute(route.config.path)});
                      console.log(listItemClasses)
                      const whiteFontClasses = classNames({[" " + classes.whiteFont]: this.activeRoute(route.config.path)});
                          return (
                              <NavLink
                                to={route.config.path}
                                className={classes.item}
                                activeClassName="active"
                                key={key}
                              >
                                <ListItem button className={classes.itemLink + listItemClasses}>
                                  <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                                    {typeof route.config.icon === "string" ? (
                                      <Icon>{route.config.icon}</Icon>
                                    ) : (
                                      <route.config.icon />
                                    )}
                                  </ListItemIcon>
                                  <ListItemText
                                    className={classes.itemText + whiteFontClasses}
                                    disableTypography={true}
                                  >
                                      <Trans>{route.config.sidebarName}</Trans>
                                  </ListItemText>
                                </ListItem>
                              </NavLink>
                          )
              })}
            </List>
          )
    }
}

export default withStyles(sideboardStyle)(withTranslation("translations")(MenuLinks))
