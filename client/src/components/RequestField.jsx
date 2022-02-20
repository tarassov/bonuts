import React, { useContext } from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";

import { useTranslation } from "react-i18next";

import CustomTableItemContext from "components/base/table/customTableItemContext";
import ProfileButton from "components/ProfileButton";
import DonutButton from "./DonutButton";
import RegularButton from "./base/customButtons/RegularButton";





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


export default function RequestField({hideProfile}) {
  const context = useContext(CustomTableItemContext);
  const classes = useStyles();
  const {t} = useTranslation();
  const  item  = context;
  return (
    <React.Fragment>
      {item !== undefined && item !== null && (
        <Grid container >
          {item.profile !== undefined &&        
              <React.Fragment>
                <DonutButton
                  donut={item.donut}
                />
                {!hideProfile &&   <React.Fragment> 
                  <span className={classes.itemText}>
                    {" "}{t("for")}{" "}
                  </span>
                  <ProfileButton
                    profile={{...item.profile, user_name: item.name }}
                    onClick={profileClick}
                  />
                  </React.Fragment>}
                    <span className={classes.itemText}>
                    {item.created_at}
                  </span>
                  <RegularButton simple color="primary"> {t("Details")}</RegularButton>
   
                </React.Fragment>
          }
        </Grid>
      )}
    </React.Fragment>
  )
}



RequestField.propTypes = {
  hideProfile: PropTypes.bool
};

