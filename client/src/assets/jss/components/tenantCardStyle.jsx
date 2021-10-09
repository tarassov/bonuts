import {
    roseColor,
    cardTitle
  } from "assets/jss/baseStyles.jsx";
  

const tenantCardStyle =  ({
    cardTitle,
    cardTitleWhite: {
      ...cardTitle,
      color: "#FFFFFF",
      marginTop: "0",
    },
        
    list: {
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center'
    },
    marginTop30: {
        marginTop: "30px",
      },
    cardCategoryWhite: {
      margin: "0",
      color: "rgba(255, 255, 255, 0.8)",
      fontSize: ".875rem",
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

    cardCategory: {
        color: "#999999",
        marginTop: "10px",
      },
    iconRose: {
        color: roseColor,
      },
    icon: {
        color: "#333333",
        margin: "10px auto 0",
        width: "130px",
        height: "130px",
        border: "1px solid #E5E5E5",
        borderRadius: "50%",
        lineHeight: "174px",
        "& svg": {
          width: "55px",
          height: "55px",
        },
        "& .fab,& .fas,& .far,& .fal,& .material-icons": {
          width: "55px",
          fontSize: "55px",
        },
      },
    actions: {
        display: 'flex',   
        alignItems: 'center',
        justifyContent: 'flex-end'
    },

      
});
 export default tenantCardStyle