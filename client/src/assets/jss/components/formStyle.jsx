import {
    warningCardHeader,
    successCardHeader,
    dangerCardHeader,
    infoCardHeader,
    primaryCardHeader,
    roseCardHeader,
    secondaryCardHeader,
    whiteColor,
    infoColor,
    warningColor,
    primaryColor,
    roseColor,
    grayColor
  } from "assets/jss/baseStyles.jsx";

const formStyle = theme => ({
    container: {
        display: 'block',
        margin: "auto",
    },
    button: {
        color: primaryColor,
        display: "flex",
        margin: "auto"
    },

    infoButton: {
        color: infoColor[0],
    },

    primaryButton: {
        color: primaryColor,
    },
    warningButton: {
        color: warningColor[1],
    },
    input: {
        display: 'none',
    },

    textField: {
        width: 200,
        display: 'flex',
        margin: 'auto'
    },
    menu: {
        width: 200,
    },
    smField:{
        width: 300,  
    },
    mdField: {
        [theme.breakpoints.up('md')]: {
            width: 400,
          },
    },
    lgField: {
        [theme.breakpoints.up('xs')]: {
         width: `calc(100% - ${theme.spacing(9)}px)`,
        },
    },
    okButton:{
        marginLeft: "auto",
        width: "auto",
        display: "flex",
        float:"right"
    } ,
    
    cancelButton: {
        display: "block",
        width: "auto",
        float: "right",
        color: grayColor[1],
    },
    image: {
        maxWidth:200,
        maxHeight: 300,
        display: "flex",
        margin:"auto"
    }
});

export default formStyle;
