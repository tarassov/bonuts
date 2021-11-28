import { cardTitle } from "assets/jss/baseStyles.jsx";
import hoverCardStyle from "assets/jss/components/base/hoverCardStyle";

const tenantCardStyle = {
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
    width: "56px",
    height: "56px",
    verticalAlign: "middle",
    margin: "auto",
    border: "0",
  },
};
export default tenantCardStyle;
