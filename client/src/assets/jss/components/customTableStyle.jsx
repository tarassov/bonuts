import {
  defaultFont,
  primaryColor,
  blackColor,
  dangerColor,
  grayColor,
  whiteColor,
  hexToRgb,
} from "assets/jss/baseStyles.jsx";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import checkboxAndRadioStyle from "assets/jss/checkBoxAndRadioStyle.jsx";
const customTableStyle = (theme) => ({
  ...checkboxAndRadioStyle,
  root: {
    flexGrow: 1,
  },
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
    lineBreak: "auto",
  },

  button: {
    font: "inherit",
    textTransform: "none",
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
      lineHeight: "1",
    },
  },
  cardCategoryWhite: {
    color: "rgba(" + hexToRgb(whiteColor) + ",.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },

  table: {
    marginBottom: "0",
    overflow: "visible",
    background: whiteColor,
    // maxWidth: "600px"
  },
  tableRow: {
    position: "relative",
    borderBottom: "1px solid " + grayColor[5],
    justifyContent: "space-between",
    display: "flex",
  },
  tableActions: {
    display: "flex",
    textAlign: "right",
    border: "none",
    padding: "12px 0px !important",
    verticalAlign: "middle",
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    //width: "30px",
  },
  tableAvatar: {},
  tableCell: {
    ...defaultFont,
    padding: "8px",
    // verticalAlign: "middle",
    margin: "auto",
    alignSelf: "stretch",
    border: "none", //"1px solid " + grayColor[5],
    lineHeight: "1.42857143",
    fontSize: "14px",
    width: "100%",
  },

  tableActionButton: {
    width: "30px",
    height: "30px",
    padding: "0",
  },

  toolbar: {
    margin: "0 0 0 0",
    padding: "0 0 0 0",
    minHeight: "20px",
  },

  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },

  title: {
    margin: "0px",
    padding: "0px",
    flexGrow: "1",
  },
  not_active: {
    backgroundColor: grayColor[3],
    textDecoration: "line-through",
  },
});
export default customTableStyle;
