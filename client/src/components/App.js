import React, { Component } from "react";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
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
import TenantCardList from "./TenantCardList";
import { createTheme } from "@material-ui/core/styles";
import Redirector from "containers/Redirector";

const theme = createTheme({
  palette: {
    primary: {
      ...green,
      500: primaryColor[0],
      600: primaryColor[1],
      700: primaryColor[2],
      800: primaryColor[3],
      900: primaryColor[4],
    }, // Purple and green play nicely together.
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      drawerOpen: true,
    };
    this.resizeFunction = this.resizeFunction.bind(this);
    this.mainPanel = React.createRef();
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }

  componentWillMount() {
    if (this.props.authenticate.authenticated) {
      this.props.actions.onLoad();
    }
  }

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      if (
        this.mainPanel.current !== undefined &&
        this.mainPanel.current !== null
      ) {
        const ps = new PerfectScrollbar(this.mainPanel.current);
      }
    }
    window.addEventListener("resize", this.resizeFunction);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      if (
        this.mainPanel.current !== undefined &&
        this.mainPanel.current !== null
      ) {
        try {
          this.mainPanel.current.scrollTop();
        } catch {
          this.mainPanel.current.scrollTop = 0;
        }
      }
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }

  handleDrawerOpen = () => {
    this.setState({ drawerOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ drawerOpen: false });
  };

  render() {
    const { classes, authenticate, ui, ...rest } = this.props;
    let auth = authenticate.authenticated;
    let currentTenant = authenticate.currentTenant;
    let routes = getRoutes({
      authenticated: auth,
      currentTenant: currentTenant,
    });
    var mainPanelClass;
    if (!this.state.drawerOpen || !auth) {
      mainPanelClass = classNames(classes.mainPanel, classes.mainPanelWide);
      //  {classes.mainPanel,!this.state.drawerOpen && classes.mainPanelWide}
    } else {
      mainPanelClass = classNames(classes.mainPanel);
    }

    return (
      <MuiThemeProvider theme={theme}>
        <Notifier />

        {auth && (
          <React.Fragment>
            <div className={classes.wrapper}>
              <SideboardContainer
                routes={routes}
                handleDrawerOpen={this.handleDrawerOpen.bind(this)}
                handleDrawerClose={this.handleDrawerClose.bind(this)}
                open={this.state.drawerOpen}
                color="gray"
                S
                {...rest}
              />

              <div className={mainPanelClass} ref={this.mainPanel}>
                <HeaderContainer routes={routes} {...rest} />
                <div className={classes.content}>
                  <Redirector>
                    <AuthenticatedRoutes currentTenant={currentTenant} />
                  </Redirector>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}

        {!auth && (
          <div className={mainPanelClass}>
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
}

export default withRouter(withStyles(appStyle)(App));
