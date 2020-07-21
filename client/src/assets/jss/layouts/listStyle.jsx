import {
    defaultFont,
    primaryColor,
    successColor,
    blackColor,
    dangerColor,
    grayColor,
    whiteColor,
    hexToRgb
  } from "assets/jss/baseStyles.jsx";
  
  const listStyle = {
    tableActionButtonIcon: {
      width: "27px",
      height: "27px"
    },
    edit: {
      backgroundColor: "transparent",
      color: primaryColor,
      boxShadow: "none",
      fontSize: "30"
    },
    buy: {
        backgroundColor: "transparent",
        color: successColor[3],
        boxShadow: "none",
        fontSize: "30"
      },
    activate: {
        backgroundColor: "transparent",
        color: successColor[3],
        boxShadow: "none",
        fontSize: "30"
      },
    close: {
      backgroundColor: "transparent",
      color: dangerColor[0],
      boxShadow: "none"
    }
  
  };
  export default listStyle;
  