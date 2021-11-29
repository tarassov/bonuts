import { cardTitle, dangerColor, infoColor, secondaryColor } from "assets/jss/baseStyles.jsx";
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
    maxWidth: "100px",
    height: "100px",
    verticalAlign: "middle",
    margin: "auto",
    border: "0",
  },

  donutCard: {
    maxWidth: "300px"
  },
  remainsContainer:{
    position:"absolute",  
    top: "0",
    right: "0",
    color: dangerColor[1],
    backgroundColor: secondaryColor[4],
    borderRadius: "3px",
    boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14)",
  },
  wrapper: {
    position: "relative"
  },
};


export default donutCardStyle;
