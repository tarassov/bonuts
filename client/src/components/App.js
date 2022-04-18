import React, { useEffect,useState, Suspense, useMemo } from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import { MuiThemeProvider } from "@material-ui/core/styles";
import HeaderContainer from "containers/HeaderContainer";
import orange from "@material-ui/core/colors/orange";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { primaryColor, secondaryColor } from "assets/jss/baseStyles.jsx";

import appStyle from "assets/jss/layouts/appStyle.jsx";
//import Sideboard from "components/Sidebar/Sideboard"
import SideboardContainer from "containers/SideboardContainer";
import Modal from "modals/Modal";
import Notifier from "components/Notifier";
import { getRoutes } from "routes/appRoutes.jsx";
import AuthenticatedRoutes from "routes/components/AuthenticatedRoutes";
import AnonymousRoutes from "routes/components/AnonymousRoutes";
import { createTheme } from "@material-ui/core/styles";
import { useLocation } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { useClearCache } from 'react-clear-cache';
import Sideboard from "./Sideboard";
import { useTranslation } from "react-i18next";
import RegularButton from "./base/customButtons/RegularButton";
const theme = createTheme({
  palette: {
    primary: {
      ...green,
      500: primaryColor[0],
      600: primaryColor[1],
      700: primaryColor[2],
      800: primaryColor[3],
      900: primaryColor[4],
    }, 
    secondary: {
      ...orange,
      500: secondaryColor[0],
      600: secondaryColor[1],
      700: secondaryColor[2],
      800: secondaryColor[3],
      900: secondaryColor[4],
      A400: "#00e677",
    },
    error: red,
  },
});

const useStyles = makeStyles(appStyle);

export default  function App(props) {

  const [mobileOpen, setMobileOpen] =  useState(false)
  const [drawerOpen, setDrawerOpen] =  useState(true)

  const mainPanel = React.createRef();

  const location = useLocation()

  const classes = useStyles()
  const {t} = useTranslation();

  useEffect(() => {
    if (props.authenticate.authenticated) {
      props.actions.onLoad();
    }
    if (navigator.platform.indexOf("Win") > -1) {
      if (
        mainPanel.current !== undefined &&
        mainPanel.current !== null
      ) {
        const ps = new PerfectScrollbar(mainPanel.current);
      }
    }
  }, [])


  useEffect(() => {
    if (
      mainPanel.current !== undefined &&
      mainPanel.current !== null
    ) {
      try {
        mainPanel.current.scrollTop();
      } catch {
        mainPanel.current.scrollTop = 0;
      }
    }
    if (mobileOpen) {
      setMobileOpen(false);
    }
  }, [location])



  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

    const {authenticate,profile, ui, ...rest } = props;
    let auth = authenticate.authenticated;
    let currentTenant = authenticate.currentTenant;

  //  const routes =
  //    getRoutes({
  //        authenticated:  authenticate.authenticated,
  //        currentTenant: currentTenant,
  //        profile
  //      });

  const routes = useMemo(()=>{
    return getRoutes({
        authenticated:  authenticate.authenticated,
        currentTenant: authenticate.currentTenant,
        profile
      });
  },[profile,authenticate])

    const mainPanelClass = classNames({
      [classes.mainPanel]:true,
      [classes.mainPanelWide]: (!drawerOpen || !authenticate.authenticated)
    })
    
    const { isLatestVersion, emptyCacheStorage } = useClearCache();
   
    return (
      <MuiThemeProvider theme={theme}>
         <Notifier />

        {auth && (
          <React.Fragment>
            <div className={classes.wrapper}>
              <Sideboard
                routes={routes}
                handleDrawerOpen={handleDrawerOpen}
                handleDrawerClose={handleDrawerClose}
                open={drawerOpen}
                color="orange"                
                {...rest}
              />
              
                   

              <div className={mainPanelClass} ref={mainPanel}>
                <HeaderContainer routes={routes} {...rest} />   
                <div className={classes.content}>
                  <div className={classes.container}>
                         <div>
                            {!isLatestVersion && (
                              <p>
                                <a
                                  href="#"
                                  onClick={e => {
                                    e.preventDefault();
                                    emptyCacheStorage();
                                  }}
                                >
                                  <RegularButton round color={"info"}>{t("Update is available")}</RegularButton> 
                                </a>
                              </p>
                            )}
                      </div>   
                      <AuthenticatedRoutes routes={routes} currentTenant={currentTenant} />
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}

        {!auth && (
          <div >
            <div className={classes.content}>
              <div className={classes.container}>
                   <AnonymousRoutes />
              </div>
            </div>
          </div>
        )}
        <Modal />
      </MuiThemeProvider>
    );
  
}

