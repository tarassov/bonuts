import React, { Component } from 'react';
import {withRouter,Switch, Route, Redirect } from 'react-router-dom'
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import {MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import HeaderContainer from "containers/HeaderContainer"
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";


import appStyle from "assets/jss/layouts/appStyle.jsx";
//import Sideboard from "components/Sidebar/Sideboard"
import SideboardContainer from "containers/SideboardContainer"
import Modal from 'modals/Modal'
import Notifier from 'components/Notifier'
import {routes,anonymousRedirects,authenticatedRedirects} from "routes/appRoutes.jsx";

import TenantCardList from './TenantCardList';


const theme = createMuiTheme({
    palette: {
        primary: {...green}, // Purple and green play nicely together.
        secondary: {
            ...orange,
            A400: '#00e677',
        },
        error: red,
    },

});


const switchRoutes  = (
  <Switch>
    {routes.map((route, key) => {
        if (route.config.authenticated !== undefined && route.config.authenticated
            && route.config.active) {          
            return <Route path={route.config.path} component={route.config.component} key={key}/>;
        }
    })}
    {authenticatedRedirects.map((redirect, key) =>{
      return <Redirect path={redirect.from.path} to={redirect.to.path} key={key}/>;
    })}
  </Switch>
);
const switchAnonymousRoutes = (
    <Switch>
      {routes.map((route, key) => {
      if (route.config.anonymous && route.config.active) {          
          return <Route path={route.config.path} component={route.config.component} key={key}/>;
      }
      })}
      {anonymousRedirects.map((redirect, key) =>{
        return <Redirect path={redirect.from.path} to={redirect.to.path} key={key}/>;
      })}
    </Switch>
);

class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      drawerOpen: true
    };
    this.resizeFunction = this.resizeFunction.bind(this);
    this.mainPanel = React.createRef()
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
    if(this.props.authenticate.authenticated) {
        this.props.actions.onLoad()
    }
  }

  componentDidMount() {  
    if (navigator.platform.indexOf("Win") > -1) {
      if (this.mainPanel.current !== undefined && this.mainPanel.current !==null){
        const ps = new PerfectScrollbar(this.mainPanel.current)
      }
    }
    window.addEventListener("resize", this.resizeFunction);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname){
      if (this.mainPanel.current !==undefined && this.mainPanel.current !== null) {
        try{
          this.mainPanel.current.scrollTop()
        }
        catch{
          this.mainPanel.current.scrollTop = 0
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
        const { classes,authenticate, ...rest } = this.props;
        let auth = authenticate.authenticated;
        let currentTenant = authenticate.currentTenant;
        
        var mainPanelClass;
        if(!this.state.drawerOpen || !auth){
              mainPanelClass = classNames(classes.mainPanel, classes.mainPanelWide);
            //  {classes.mainPanel,!this.state.drawerOpen && classes.mainPanelWide}
        }
        else {
            mainPanelClass = classNames(classes.mainPanel);
        }

        return (
            <MuiThemeProvider theme={theme}>
                    <Notifier />

                    {auth &&  (
                         <React.Fragment>                         
  
                             <div className={classes.wrapper}>     
                                <SideboardContainer
                                    routes={routes}
                                    handleDrawerOpen = {this.handleDrawerOpen.bind(this)}
                                    handleDrawerClose = {this.handleDrawerClose.bind(this)}
                                    open = {this.state.drawerOpen}
                                    color="gray"S
                                    {...rest}
                                  />
                                
                                  <div className={mainPanelClass} ref={this.mainPanel}>
                                      <HeaderContainer  routes={routes} {...rest}/>
                                      {currentTenant != undefined && <div className={classes.content}>
                                          <div className={classes.container}>{switchRoutes}</div>
                                      </div>
                                      }
                                  </div>  
                                  </div> 
                          
                            {currentTenant === undefined &&
                              <React.Fragment>
                                  <TenantCardList tenants={authenticate.tenants}/>
                              </React.Fragment>
                            }                         
                            </React.Fragment>
                          
                    )}
            
                    {!auth &&
                         <div className={mainPanelClass} >
                            <div className={classes.content}>
                                <div className={classes.container}>{switchAnonymousRoutes}</div>
                            </div>
                        </div>}
                    <Modal/>
            </MuiThemeProvider>
            );
    }

}


export default withRouter(withStyles(appStyle)(App));
