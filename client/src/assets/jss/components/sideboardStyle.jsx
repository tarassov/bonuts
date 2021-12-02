import {
  drawerWidth,
  drawerCloseWidth,
  transition,
  boxShadow,
  defaultFont,
  primaryColor,
  primaryBoxShadow,
  defaultBoxShadow,
  grayColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  whiteColor,
  hexToRgb,
} from "assets/jss/baseStyles.jsx";

const sideboardStyle = (theme) => ({
  drawerPaper: {
    border: "none",
    position: "fixed",
    top: "0",
    bottom: "0",
    left: "0",
    zIndex: "1",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(8),
    },
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  hidden: {
    display: "none",
  },
  toolbar: {
    paddingRight: drawerCloseWidth, // keep right padding when drawer closed
  },
  logo: {
    position: "relative",
    padding: "15px 15px 5px 10px",
    zIndex: "4",
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: "0",

      height: "1px",
      right: "15px",
      width: "calc(100% - 30px)",
      backgroundColor: "rgba(" + hexToRgb(grayColor[6]) + ", 0.3)",
    },
  },
  logoLink: {
    ...defaultFont,
    textTransform: "uppercase",
    padding: "5px 0",
    display: "block",
    fontSize: "18px",
    textAlign: "left",
    fontWeight: "400",
    lineHeight: "30px",
    textDecoration: "none",
    backgroundColor: "transparent",
    "&,&:hover": {
      color: primaryColor,
    },
  },
  logoImage: {
    width: "200px",
    display: "inline-block",
    maxHeight: "40px",
    marginLeft: "10px",
    marginRight: "15px",
  },
  logoImage_sm: {
    width: "100px",
    display: "inline-block",
    maxHeight: "40px",
    marginLeft: "10px",
    marginRight: "15px",
  },
  img: {
    width: "180px",
    top: "3px",
    position: "absolute",
    verticalAlign: "middle",
    border: "0",
  },
  img_sm: {
    width: "180px",
    top: "3px",
    marginTop: "17px",
    marginLeft: "0px",
    position: "absolute",
    verticalAlign: "middle",
    border: "0",
  },
  list: {
    marginTop: "20px",
    paddingLeft: "0",
    paddingTop: "0",
    paddingBottom: "0",
    marginBottom: "0",
    listStyle: "none",
    position: "unset",
  },
  item: {
    position: "relative",
    display: "block",
    //height:"40px",
    textDecoration: "none",
    "&:hover,&:focus,&:visited,&": {
      color: "black",
    },
  },
  itemLink: {
    width: "210px",
    height: "40px",
    transition: "all 300ms linear",
    margin: "10px 10px 0",
    borderRadius: "3px",
    position: "relative",
    display: "block",
    padding: "5px 10px",
    //-backgroundColor: "transparent",
    ...defaultFont,
  },
  itemIcon: {
    width: "24px",
    marginLeft: "10px",
    height: "30px",
    fontSize: "24px",
    paddingTop: "3px",
    lineHeight: "30px",
    float: "left",
    marginRight: "18px",
    textAlign: "center",
    verticalAlign: "middle",
    color: "rgba(0, 0, 0, 0.8)",
  },
  itemText: {
    ...defaultFont,
    margin: "0",
    lineHeight: "30px",
    fontSize: "14px",
  },
  purple: {
    backgroundColor: primaryColor[0],
    ...primaryBoxShadow,
    "&:hover": {
      backgroundColor: primaryColor[0],
      ...primaryBoxShadow,
    },
  },
  gray: {
    backgroundColor: grayColor,
    ...defaultBoxShadow,
    paddingTop: "5px",
    "&:hover": {
      backgroundColor: grayColor,
      ...defaultBoxShadow,
      paddingTop: "5px",
    },
  },
  blue: {
    backgroundColor: infoColor,
    boxShadow:
      "0 12px 20px -10px rgba(0,188,212,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(0,188,212,.2)",
    "&:hover": {
      backgroundColor: infoColor,
      boxShadow:
        "0 12px 20px -10px rgba(0,188,212,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(0,188,212,.2)",
    },
  },
  green: {
    backgroundColor: successColor,
    boxShadow:
      "0 12px 20px -10px rgba(76,175,80,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(76,175,80,.2)",
    "&:hover": {
      backgroundColor: successColor,
      boxShadow:
        "0 12px 20px -10px rgba(76,175,80,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(76,175,80,.2)",
    },
  },
  orange: {
    backgroundColor: warningColor,
    boxShadow:
      "0 12px 20px -10px rgba(255,152,0,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(255,152,0,.2)",
    "&:hover": {
      backgroundColor: warningColor,
      boxShadow:
        "0 12px 20px -10px rgba(255,152,0,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(255,152,0,.2)",
    },
  },
  red: {
    backgroundColor: dangerColor,
    boxShadow:
      "0 12px 20px -10px rgba(244,67,54,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(244,67,54,.2)",
    "&:hover": {
      backgroundColor: dangerColor,
      boxShadow:
        "0 12px 20px -10px rgba(244,67,54,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(244,67,54,.2)",
    },
  },
  sidebarWrapper: {
    position: "relative",
    height: "calc(100vh - 75px)",
    overflow: "auto",
    width: drawerWidth,
    zIndex: "4",
    overflowScrolling: "touch",
    transitionProperty: "top, bottom, width",
    transitionDuration: ".2s, .2s, .35s",
    transitionTimingFunction: "linear, linear, ease",
    color: "inherit",
    paddingBottom: "30px",
  },
  sidebarWrapperWithPerfectScrollbar: {
    overflow: "hidden !important",
  },
});
export default sideboardStyle;
