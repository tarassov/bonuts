import { whiteColor, hexToRgb } from "assets/jss/baseStyles.jsx";

const cardBodyStyle = {
  cardBody: {
    padding: "0.9375rem 20px",
    flex: "1 1 auto",
    WebkitBoxFlex: "1",
    position: "relative",
  },
  cardBodyBackground: {
    position: "relative",
    zIndex: "2",
    minHeight: "280px",
    paddingTop: "40px",
    paddingBottom: "40px",
    maxWidth: "440px",
    margin: "0 auto",
  },
  cardBodyPlain: {
    paddingLeft: "5px",
    paddingRight: "5px",
  },
  cardBodyProfile: {
    marginTop: "15px",
  },
  cardBodyTeam: {
    padding: "15px!important",
    margin: "0px!important",
  },
  cardBodyColor: {
    borderRadius: "6px",
    "& h1,& h2,& h3": {
      "& small": {
        color: "rgba(" + hexToRgb(whiteColor) + ", 0.8)",
      },
    },
  },
};

export default cardBodyStyle;
