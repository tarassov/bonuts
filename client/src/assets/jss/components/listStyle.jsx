import {
  defaultFont,
  primaryColor,
  dangerColor,
  grayColor,
  whiteColor,
  hexToRgb
} from "assets/jss/baseStyles.jsx";
import checkboxAndRadioStyle from "assets/jss/checkBoxAndRadioStyle.jsx";
const listStyle = {
  ...checkboxAndRadioStyle,
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
    overflow: "visible"
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
    border: "none",
    lineHeight: "1.42857143",
    fontSize: "14px"
  },
  tableCellRTL: {
    textAlign: "right"
  },
  tableActionButton: {
    width: "27px",
    height: "27px",
    padding: "0"
  },
  tableActionButtonIcon: {
    width: "17px",
    height: "17px"
  },
  edit: {
    backgroundColor: "transparent",
    color: primaryColor[0],
    boxShadow: "none"
  },
  close: {
    backgroundColor: "transparent",
    color: dangerColor[0],
    boxShadow: "none"
  }
};
export default listStyle;
