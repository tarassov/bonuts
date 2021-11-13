import { cardTitle } from "assets/jss/baseStyles.jsx";
import hoverCardStyle from "assets/jss/components/base/hoverCardStyle";

const donutCardStyle = {
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
    maxWidth: "160px",
    maxHeight: "190px",
    verticalAlign: "middle",
    margin: "auto",
    border: "0",
  },

  donutCard: {
    maxWidth: "300px"
  }
};


export default donutCardStyle;
