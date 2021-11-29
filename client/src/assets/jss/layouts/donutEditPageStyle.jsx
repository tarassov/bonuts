import {
    cardTitle,
    grayColor,
    defaultFont,
  } from "assets/jss/baseStyles";
  
  const donutsLayoutStyle = {
    cardTitle,
    cardIconTitle: {
      ...cardTitle,
      marginTop: "15px",
      marginBottom: "0px",
      "& small": {
        fontSize: "80%",
        fontWeight: "400",
      },
    },
    cardCategory: {
      marginTop: "10px",
      color: grayColor[0] + " !important",
      textAlign: "center",
    },
    description: {
      color: grayColor[0],
    },
    actionButton: {
      float: "right",
    },
    price: {
      margin: "20px",
      color: "black",
      fontSize: "18px",
      fontWeight: 'bold'
    },
    remains: {
      marginLeft: "20px",
      marginTop: "0",
      color: grayColor[2],
      fontSize: "14px",
      fontWeight: 'bold'
    },
    label: {
      ...defaultFont,
      color: grayColor[3] + " !important",
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "1.42857",
      top: "10px",
      letterSpacing: "unset",
      "& + $underline": {
        marginTop: "0px",
      },
    },
    backLink: {
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: "-20px",
        marginLeft: "-20px",
        maxWidth: "calc(100% + 20px)",
        width: "calc(100% + 20px)"

    },
  };
  export default donutsLayoutStyle;
  