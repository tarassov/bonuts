import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import CustomTableItemContext from "components/base/table/customTableItemContext";
import ProfileButton from "components/ProfileButton";

import { Grid } from "@material-ui/core";

import {
  successColor,
  dangerColor,
  primaryColor,
} from "assets/jss/baseStyles.jsx";
import profile from "reducers/profile";
import DonutButton from "./DonutButton";


const style = () => ({
  itemText: {
    display: "inline-flex",
    margin: "auto 2px",
    padding: 2,
    whiteSpace: "pre-wrap" /* css-3 */,
    wordBreak: "break-word",
  },
  operationContainer: {
    padding: 0,
    margin: 0,
  },
});

const useStyles = makeStyles(style)

const profileClick =() =>{

}

function RequestField() {
  const context = useContext(CustomTableItemContext);
  const classes = useStyles();
  const {t} = useTranslation();
  const  item  = context;
  console.log(item)
  return (
    <React.Fragment>
      {item !== undefined && item !== null && (
        <Grid container >
          {item.profile !== undefined &&        
              <React.Fragment>
                <DonutButton
                  donut={item.donut}
                />
                <span className={classes.itemText}>
                  {" "}{t("from")}{" "}
                </span>
                <ProfileButton
                  profile={{...item.profile, name: item.name }}
                  onClick={profileClick}
                />
              </React.Fragment>
          }
        </Grid>
      )}
    </React.Fragment>
  )
}

export default RequestField;
