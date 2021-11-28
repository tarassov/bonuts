import { cardTitle } from "assets/jss/baseStyles.jsx";
import hoverCardStyle from "assets/jss/components/base/hoverCardStyle";

const profileCardStyle = (theme) => ({
  ...hoverCardStyle,
  cardTitle,
  cardTitleWhite: {
    ...cardTitle,
    color: "#FFFFFF",
    marginTop: "0",
  },

  marginTop10: {
    marginTop: "10px",
  },

  img: {
    width: "auto",
    height: "auto",
    maxHeight: "160px",
    maxWidth: "100%",
    verticalAlign: "middle",
    margin: "auto",
    border: "0",
    [theme.breakpoints.down("xs")]: {
        maxHeight: "90px",
      },
  },

  profileCard: {
    margin: "10px auto", 
    textAlign: "left",
    height: "230px",
    [theme.breakpoints.down("xs")]: {
        height: "155px",
      },
  },
  body: {
    height: "175px",
    [theme.breakpoints.down("xs")]: {
        height: "100px",
      },
  },
  actions: {
    display: "flex",
  },
});


export default profileCardStyle;
