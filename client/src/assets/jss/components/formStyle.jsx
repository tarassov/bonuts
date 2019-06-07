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
    primaryColor
  } from "assets/jss/baseStyles.jsx";

const formStyle = theme => ({
    container: {
        display: 'block',
    },
    button: {
        width: 200,
        display: 'flex',
        margin: 'auto',
        color: primaryColor,
    },

    infoButton: {
        color: infoColor[0],
    },

    primaryButton: {
        color: primaryColor,
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
        [theme.breakpoints.up('sm')]: {
         width: `calc(100% - ${theme.spacing.unit * 9}px)`,
        },
    }
});

export default formStyle;
