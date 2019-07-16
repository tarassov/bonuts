import {
    drawerWidth,
    drawerCloseWidth,
    transition,
    container
  } from "assets/jss/baseStyles.jsx";
  
  const userStyle = theme => ({
    image :{
        display: 'block',
        maxwidth: 300,
        maxHeight: 300,
        margin:'auto',
        padding:0,
      [theme.breakpoints.up('xs')]: {
        width: 125,
      },
      [theme.breakpoints.up('sm')]: {
        width: 180,
      },
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
  
    },
    caption: {
      textAlign: 'center',
    }
  });
  
  export default userStyle;
  