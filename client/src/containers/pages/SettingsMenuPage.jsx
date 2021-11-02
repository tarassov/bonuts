import React, { useCallback } from "react";
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
import { useDispatch } from 'react-redux'
import { push } from "connected-react-router";


const useStyles = makeStyles(sideboardStyle);

export default function SettingsMenuPage(props)  {
 
    let routes = getRoutes({
        authenticated: true,
        currentTenant: true,
      });

    const classes = useStyles();
    const { t } = useTranslation();
    const color = "grey";

    const dispatch = useDispatch()

    const onMenuClick = useCallback((route) => {
        dispatch(push(route.path))
    }, [routes]);

    return (
      <GridContainer className={classes.list}>
        {
            routes.map((route, key) => {
                if (route.config.sidebarName === undefined || !route.config.settingsRoute) return;
                return(
                    <GridItem xs={12} sm={4} md={3} key={key}>
                        <MenuCard menuItem={route} onClick={onMenuClick}/>
                    </GridItem>
                )             
           })
        }         
      </GridContainer>
    )
}

