import { cardTitle } from "assets/jss/baseStyles.jsx";

const menuCardStyle = {
  cardTitle,
  cardTitleWhite: {
    ...cardTitle,
    color: "#FFFFFF",
    marginTop: "0",
  },

  actionArea: {
    height: "100%",
    width: "100%",
  },

  marginCenter: {
   margin: "auto",
   textAlign: "center" 
  },

  menuItem: {
      maxWidth: "250px",
      height: "150px",
      verticalAlign: "middle",

      margin: "auto",
  },

  icon: {
    color: "#333333",
    margin: "2px auto 0",
    width: "60px",
    height: "60px",
    border: "1px solid #E5E5E5",
    borderRadius: "50%",
    lineHeight: "100px",
    "& svg": {
      width: "50px",
      height: "50px",
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      width: "50px",
      fontSize: "50px",
    },
  },
};
export default menuCardStyle;
