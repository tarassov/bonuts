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
              {routes.map((prop, key) => {
                      if (prop.redirect || 
                        !prop.authenticated || 
                        prop.hideInMenu || 
                        prop.sidebarName ===undefined ||
                        (prop.admin && !profile.admin)
                        ) return null;
                      const listItemClasses = classNames({[" " + classes[color]]: this.activeRoute(prop.path)});
                      console.log(listItemClasses)
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
}

export default withStyles(sideboardStyle)(withTranslation("translations")(MenuLinks))
