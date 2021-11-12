import {
  infoColor,
  warningColor,
  primaryColor,
} from "assets/jss/baseStyles.jsx";

const formStyle = (theme) => ({
  container: {
    display: "block",
    margin: "auto",
    height: "auto",
  },
  gridItem: {
    margin: 0,
    padding: "0 15px 5px !important",
  },
  button: {
    color: primaryColor[0],
    display: "flex",
    margin: "auto",
  },
  buttonWhite: {
    color: "white",
    display: "flex",
    margin: "auto",
  },

  infoButton: {
    color: infoColor[0],
  },

  primaryButton: {
    color: primaryColor[0],
  },
  warningButton: {
    color: warningColor[1],
  },
  input: {
    display: "none",
  },

  textField: {
    width: 200,
    display: "flex",
    margin: "auto",
  },
  formControl: {
    height: 40,
  },
  downshiftControl: {
    marginTop: 10,
    paddingBottom: "0px !important",
  },
  menu: {
    width: 200,
  },
  smField: {
    width: 300,
  },
  mdField: {
    [theme.breakpoints.up("md")]: {
      width: 400,
    },
  },
  lgField: {
    [theme.breakpoints.up("xs")]: {
      width: `calc(100% - ${theme.spacing(2)}px)`,
      height: "auto",
    },
  },
  okButton: {
    display: "flex",
    float: "right",
  },

  cancelButton: {
    display: "block",
    float: "right",
  },
  
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
  label: {
    width: "auto",
    margin: 0,
  },
});

export default formStyle;
