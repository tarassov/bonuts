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
} from "assets/jss/baseStyles.jsx";

const registerFormStyle = (theme) => ({
  container: {
    display: "block",
  },
  content: {
    maxWidth: 600,
    margin: "0 auto",
    display: "flex",
  },
  checkBox: {
    width: 200,
  },
  button: {
    width: 200,
    display: "flex",
    margin: "auto",
    padding: 0,
  },
  cancelButton: {
    maxWidth: 200,
    display: "flex",
    margin: "auto",
    textAlign: "left",
    padding: 0,
    color: grayColor[0],
  },
  textField: {
    width: 250,
    display: "flex",
    margin: "auto",
  },
  caption: {
    marginTop: 5,
  },
});

export default registerFormStyle;
