import {
  defaultFont,
  primaryColor,
  blackColor,
  dangerColor,
  grayColor,
  whiteColor,
  hexToRgb
} from "assets/jss/baseStyles.jsx";
import checkboxAndRadioStyle from "assets/jss/checkBoxAndRadioStyle.jsx";
const listStyle = {
  ...checkboxAndRadioStyle,

  tooltip: {
      padding: "10px 15px",
      minWidth: "130px",
      lineHeight: "1.7em",
      border: "none",
      borderRadius: "3px",
      boxShadow:
        "0 8px 10px 1px rgba(" +
        hexToRgb(blackColor) +
        ", 0.14), 0 3px 14px 2px rgba(" +
        hexToRgb(blackColor) +
        ", 0.12), 0 5px 5px -3px rgba(" +
        hexToRgb(blackColor) +
        ", 0.2)",
      maxWidth: "200px",
      textAlign: "center",
      fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: "400",
      textShadow: "none",
      textTransform: "none",
      letterSpacing: "normal",
      wordBreak: "normal",
      wordSpacing: "normal",
      wordWrap: "normal",
      whiteSpace: "normal",
      lineBreak: "auto"
  },

  cardTitleWhite: {
    color: whiteColor,
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  cardCategoryWhite: {
    color: "rgba(" + hexToRgb(whiteColor) + ",.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },

  table: {
    marginBottom: "0",
    overflow: "visible",
    background: whiteColor,
    maxWidth: "400px"
  },
  tableRow: {
    position: "relative",
    borderBottom: "1px solid " + grayColor[5]
  },
  tableActions: {
    display: "flex",
    border: "none",
    padding: "12px 8px !important",
    verticalAlign: "middle"
  },
  tableCell: {
    ...defaultFont,
    padding: "8px",
    verticalAlign: "middle",
    border: "none",//"1px solid " + grayColor[5],
    lineHeight: "1.42857143",
    fontSize: "14px"
  },

  tableActionButton: {
    width: "30px",
    height: "30px",
    padding: "0"
  },


};
export default listStyle;
