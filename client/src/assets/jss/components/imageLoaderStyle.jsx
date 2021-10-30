import {
  drawerWidth,
  drawerCloseWidth,
  transition,
  container,
} from "assets/jss/baseStyles.jsx";

const imageLoaderStyle = (theme) => ({
  image: {
    display: "block",
    maxWidth: "95%",
    maxHeight: 600,
    margin: "auto",
    padding: 0,
    [theme.breakpoints.down("xs")]: {
      width: 200,
    },
  },
  modalImage: {
    display: "block",
    maxWidth: "95%",
    //maxHeight: 400,
    margin: "auto",
    padding: 0,
    [theme.breakpoints.up("xs")]: {
      maxHeight: 250,
    },
    [theme.breakpoints.up("sm")]: {
      maxHeight: 400,
    },
    [theme.breakpoints.up("md")]: {
      // width: 200,
    },
  },
  caption: {
    textAlign: "center",
  },
});

export default imageLoaderStyle;
