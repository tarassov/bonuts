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

  img: {
    width: "56px",
    height: "56px",
    verticalAlign: "middle",
    margin: "auto",
    border: "0",
  },
};
export default menuCardStyle;
