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
  

const eventCardStyles = theme => ({
    card: {
        margin: "auto",
        maxWidth: 700,

    },
    cardHeader: {
        //...grayBoxShadow,
        paddingBottom: 5,
        marginBottom: 5,
        position: "relative",
       // backgroundColor: infoColor[4],
       "&:after": {
        content: '""',
        position: "absolute",
        bottom: "0",
  
        height: "1px",
        right: "15px",
        width: "calc(100% - 30px)",
        backgroundColor: "rgba(" + hexToRgb(grayColor[6]) + ", 0.3)"
      }
    },
    cardPrivate: {
        backgroundColor: infoColor[4],
    },
    liked :{
        color: infoColor[2],
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    dateCaption: {
        marginLeft: 'auto', 
    },
    expand: {
        transform: 'rotate(0deg)',
       // marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: 'white',
        color: infoColor[2],
    },
    avatarPrivate: {
        backgroundColor: infoColor[2],
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
      },
      content: {
        padding: "0 10px 0 10px",
       // textAlign: "right"
      },

     operationContainer: {
        padding: 0,
        margin: 0,

      },      


     operationText: {
         display: 'inline-flex',
         margin: "auto 2px",
         padding: 2,
         whiteSpace: "pre-wrap",       /* css-3 */
         //whiteSpace: "-moz-pre-wrap",  /* Mozilla, since 1999 */
         //whiteSpace: "-pre-wrap",      /* Opera 4-6 */
         //whiteSpace: "-o-pre-wrap",    /* Opera 7 */
         wordWrap: "break-word"
     },

     smallAvatar: {
        width:28,
        height:28
     },
     amountText:{
        fontSize: 20,
        fontWeight: "bold",
     },
     plusText:{
        color:successColor[1]
     },
     minusText:{
        color:dangerColor[1]
     },
     accountButton: {
        textTransform: 'none' ,
        fontWeight: 400,
        paddingLeft: 0 
     },
     flexLine: {
        flexGrow: 1,
        height: 1,
        marginTop: "0px",
        marginBottom: "0px",
        marginLeft: "10px",
        marginRight: "10px",
    }, 
      
});
 export default eventCardStyles