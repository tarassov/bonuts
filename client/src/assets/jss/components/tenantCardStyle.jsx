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
    successColor,
    dangerColor,
    infoBoxShadow,
    successBoxShadow,
    grayBoxShadow,
    grayColor,
    hexToRgb
  } from "assets/jss/baseStyles.jsx";
  

const tenantCardStyle = theme => ({
    
    list: {
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center'
    },
    
    card: {
        margin: "auto",
        maxWidth: 300,
    },    

    content: {
        display: 'flex', 
        padding: '5px',  
        alignItems: 'flex-end',
        justifyContent: 'center'
    },

    actions: {
        display: 'flex',   
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
      
});
 export default tenantCardStyle