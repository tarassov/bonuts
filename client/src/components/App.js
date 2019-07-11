import React, { Component } from 'react';
import {withRouter,Switch, Route, Redirect } from 'react-router-dom'
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import {MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import HeaderContainer from "containers/HeaderContainer"
import orange from '@material-ui/core/colors/orange';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import {connect} from 'react-redux'
import {authenticate,logout,checkAuth}  from 'actions/authActions'
import {push } from 'connected-react-router'

import appStyle from "assets/jss/layouts/appStyle.jsx";
//import Sideboard from "components/Sidebar/Sideboard"
import SideboardContainer from "containers/SideboardContainer"
import Modal from 'modals/Modal'
import Notifier from 'components/Notifier'
import appRoutes from "routes/appRoutes.jsx";
import { container } from 'assets/jss/baseStyles';


const theme = createMuiTheme({
    palette: {
        primary: green, // Purple and green play nicely together.
        secondary: {
            ...orange,
            A400: '#00e677',
        },
        error: red,
    },

});


const switchRoutes  = (
  <Switch>
    {appRoutes.map((prop, key) => {
        if (prop.authenticated !== undefined && prop.authenticated
            && prop.active
        ) {
            if (prop.redirect)
                return <Redirect from={prop.path} to={prop.to} key={key}/>;
            return <Route path={prop.path} component={prop.component} key={key}/>;
        }
    })}
  </Switch>
);
const switchAnonymousRoutes = (
    <Switch>
        {appRoutes.map((prop, key) => {
            if (prop.anonymous && prop.active) {
                if (prop.redirect)
                    return <Redirect from={prop.path} to={prop.to} key={key}/>;
                return <Route path={prop.path} component={prop.component} key={key}/>;
            }
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
      if (this.mainPanel.current !==undefined && this.mainPanel.current !== null) this.mainPanel.current.scrollTo(0,0)
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }

  handleDrawerOpen = () => {
    console.log('Open drawer');
    this.setState({ drawerOpen: true });
  };

  handleDrawerClose = () => {
    console.log('Close drawer');
    this.setState({ drawerOpen: false });
  };



    render() {
        const { classes,authenticate, ...rest } = this.props;
        let auth = authenticate.authenticated;
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
                    {auth && (<div className={classes.wrapper}>
                            {auth && (<SideboardContainer
                              routes={appRoutes}
                              handleDrawerOpen = {this.handleDrawerOpen.bind(this)}
                              handleDrawerClose = {this.handleDrawerClose.bind(this)}
                              open = {this.state.drawerOpen}
                              color="gray"
                              {...rest}
                            />)}
                            <div className={mainPanelClass} ref={this.mainPanel}>
                                {auth && (<HeaderContainer  routes={appRoutes} {...rest}/>)}
                                <div className={classes.content}>
                                    <div className={classes.container}>{switchRoutes}</div>
                                </div>

                            </div>
                          </div>
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
