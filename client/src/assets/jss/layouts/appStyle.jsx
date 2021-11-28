import {
  drawerWidth,
  drawerCloseWidth,
  transition,
  container,
} from "assets/jss/baseStyles.jsx";

const appStyle = (theme) => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh",
  },
  tenants: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  mainPanel: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch",
  },
  mainPanelWide: {
    width: `calc(100% - ${theme.spacing(7)}px)`,
    [theme.breakpoints.up("xs")]: {
      width: `calc(100% - ${theme.spacing(1)}px)`,
    },
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${theme.spacing(9)}px)`,
    },
  },

  content: {
    marginTop: "30px",
    padding: "30px 10px",
    minHeight: "calc(100vh - 123px)",
  },
  container,
  map: {
    marginTop: "70px",
  },
});

export default appStyle;
