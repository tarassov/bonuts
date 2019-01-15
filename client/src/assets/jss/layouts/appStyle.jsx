import {
  drawerWidth,
  drawerCloseWidth,
  transition,
  container
} from "assets/jss/baseStyles.jsx";

const appStyle = theme => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh"
  },
  mainPanel: {
    [theme.breakpoints.up("xs")]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch"
  },
  mainPanelWide :{
    width: `calc(100% - ${theme.spacing.unit * 7}px)`,
    [theme.breakpoints.up('xs')]: {
      width: `calc(100% - ${theme.spacing.unit * 9}px)`
    },

  },

  content: {
    marginTop: "30px",
    padding: "30px 15px",
    minHeight: "calc(100vh - 123px)"
  },
  container,
  map: {
    marginTop: "70px"
  }
});

export default appStyle;
