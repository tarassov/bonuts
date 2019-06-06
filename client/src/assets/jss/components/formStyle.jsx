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
});

export default formStyle;
