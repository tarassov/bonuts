import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import GridContainer from "components/base/grid/GridContainer";
import GridItem from "components/base/grid/GridItem";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import { NavLink } from "react-router-dom";
import sideboardStyle from "assets/jss/components/sideboardStyle";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { getRoutes } from "routes/appRoutes.jsx";
import MenuCard from  "components/MenuCard"




const useStyles = makeStyles(sideboardStyle);

export default function SettingsMenuPage(props)  {
    const activeRoute = (routeName) =>{
    return props.location.pathname.indexOf(routeName) > -1 ? true : false;
    }

    let routes = getRoutes({
        authenticated: true,
        currentTenant: true,
      });

    const classes = useStyles();
    const { t } = useTranslation();
    const color = "grey";

    return (
      <GridContainer className={classes.list}>
        {
            routes.map((route, key) => {
                if (route.config.sidebarName === undefined || !route.config.settingsRoute) return;
                const listItemClasses = classNames({
                    [" " + classes[color]]: activeRoute(route.config.path),
                });
                console.log(route)    
                return(
                    <GridItem xs={12} sm={4} md={3} key={key}>
                        <MenuCard menuItem={route}/>
                    </GridItem>
                )
                return (
                    <NavLink
                    to={route.config.path}
                    className={classes.item}
                    activeClassName="active"
                    key={key}
                    >
                    <ListItem button className={classes.itemLink + listItemClasses}>
                        <ListItemIcon>
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
                )
           })
        }         
      </GridContainer>
    )
}

