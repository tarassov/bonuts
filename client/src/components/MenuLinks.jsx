import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import sideboardStyle from "assets/jss/components/sideboardStyle";
import { useLocation } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(sideboardStyle);

export default function MenuLinks(props) {

  let location = useLocation();
  const classes = useStyles();
  const {t} = useTranslation();

  const activeRoute =(routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? true : false;
  }


    const {routes, color, profile } = props;
    console.log(props)
    const filteredRoutes = routes.filter((route) => {
      
        return !route.config.redirect &&
        route.config.authenticated &&
        !route.config.hideInMenu &&
        route.config.sidebarName !== undefined &&
        (
            (route.config.admin && profile.admin)
            || (route.config.store_admin && profile.store_admin) 
            ||  (!route.config.admin && !route.config.store_admin))
    })
    console.log(routes)
    console.log(filteredRoutes)
    console.log(profile)

    return (
      <List className={classes.list}>
        {filteredRoutes.map((route, key) => {
           const listItemClasses = classNames({
            [" " + classes[color]]: activeRoute(route.config.path),
           });
       
          return (
            <NavLink
              to={route.config.path}
              className={classes.item}
                key={key}
            >
              <ListItem button className={classes.itemLink + listItemClasses}>
                <ListItemIcon className={classes.itemIcon}>
                  {typeof route.config.icon === "string" ? (
                    <Icon>{route.config.icon}</Icon>
                  ) : (
                    <route.config.icon />
                  )}
                </ListItemIcon>
                <ListItemText
                  className={classes.itemText}
                  disableTypography={true}
                >
                  {t(route.config.sidebarName)}
                </ListItemText>
              </ListItem>
            </NavLink>
          );
        })}
      </List>
    );
 
}


