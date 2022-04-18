import React, { useCallback } from "react";
import PropTypes from "prop-types";

import GridContainer from "components/base/grid/GridContainer";
import GridItem from "components/base/grid/GridItem";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getChildRoutes } from "routes/appRoutes.jsx";
import MenuCard from  "components/MenuCard"
import { useDispatch, useSelector } from 'react-redux'
import { push } from "redux-first-history";




export default function ChildPathMenu(props)  {
    const profile = useSelector(store => store.profile)
    
    let routes = getChildRoutes({
        authenticated: true,
        currentTenant: true,
        parent: props.parent,
        profile: profile
      });

    const { t } = useTranslation();
    const color = "grey";

    const dispatch = useDispatch()

 

    const onMenuClick = useCallback((route) => {
        dispatch(push(route.path))
    }, [routes]);

    return (
      <GridContainer>
        {
            routes.map((route, key) => {           
                return(
                    <GridItem xs={12} sm={6} md={4} lg={3}  key={key}>
                        <MenuCard menuItem={route} onClick={onMenuClick}/>
                    </GridItem>
                )             
           })
        }         
      </GridContainer>
    )
}

ChildPathMenu.propTypes = {
    parent: PropTypes.object.isRequired,   
};