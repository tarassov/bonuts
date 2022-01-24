import React, {useState,useEffect} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import PerfectScrollbar from "perfect-scrollbar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Hidden from "@material-ui/core/Hidden";
import Icon from "@material-ui/core/Icon";
import { NavLink } from "react-router-dom";
import logo from "assets/img/bonuts_full.svg";
import logo_sm from "assets/img/bonuts_sm.svg";
import IconButton from "@material-ui/core/IconButton";

import sideboardStyle from "assets/jss/components/sideboardStyle";
import { useTranslation} from "react-i18next";
import MenuLinks from "./MenuLinks"; //
const useStyles = makeStyles(sideboardStyle)

export default function Sideboard(props) {
 
  const mainPanel = React.createRef();
  const classes = useStyles()
  const {t} = useTranslation();
 
  const [open, setOpen] = useState(props.open)
  const auth = useSelector(state => state.authenticate.authenticated)
  const profile = useSelector(state => state.profile)

  const newProps = {...props, profile}

  var ps;

  const sidebarWrapper = React.useRef();

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebarWrapper.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });

  const handleDrawerOpen = () => {
    setOpen(true);
    props.handleDrawerOpen();
  };

  const handleDrawerClose = () => {
    setOpen(false );
    props.handleDrawerClose();
  };

  const toggle = () => {
    if (open) {
      handleDrawerClose();
    } else {
      handleDrawerOpen();
    }
  };

 
  
    var brand = (
      <div className={classes.logo}>
        <a href="#" className={classes.logoLink} onClick={toggle}>
          <div
            className={classNames(
              !open && classes.logoImage_sm,
               open && classes.logoImage
            )}
          >
            {open && (
              <img src={logo} alt="logo" className={classes.img} />
            )}
            {!open && (
              <img src={logo_sm} alt="logo" className={classes.img_sm} />
            )}
          </div>
        </a>
      </div>
    );

    return (
      <Hidden smDown implementation="css">
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !open && classes.drawerPaperClose
            ),
          }}
          open={open}
        >
          {brand}
          <div className={classNames(classes.toolbarIcon)}>
            <IconButton
              onClick={handleDrawerClose}
              className={classNames(!open && classes.hidden)}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                open && classes.hidden
              )}
            >
              <MenuIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.sidebarWrapper} ref={sidebarWrapper}>
            <MenuLinks {...newProps} />
          </div>
        </Drawer>
      </Hidden>
    );
}

