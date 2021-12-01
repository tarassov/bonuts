import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { useDispatch,useSelector } from "react-redux";
import RegularButton from "components/base/customButtons/RegularButton";
import confrimEmailStyle from "assets/jss/components/confrimEmailStyle";
import { withStyles } from "@material-ui/core/styles";
import {useTranslation } from "react-i18next";
import { loadByToken, confirmEmail } from "actions/userActions";
import { Navigate } from "react-router-dom";
import {push} from 'redux-first-history'
import { useParams } from "react-router";
import { Typography } from "@material-ui/core";
import HeaderContainer from "containers/HeaderContainer";


const useStyles = makeStyles(confrimEmailStyle)

export default function ConfirmEmailLayout(props){


  const {t} = useTranslation()
  const classes = useStyles()
  const params =  useParams()


  const dispatch = useDispatch()
  const profile = useSelector(state => state.profile)
  const authenticate = useSelector(state => state.authenticate)

  useEffect(() => {
    dispatch(loadByToken(params.token));
  }, [params.token])
 
  useEffect(() => {
    if (profile.user_not_found || profile.confirmed) {
      dispatch(push("/dashboard" ))
    }
  }, [profile])

  const click = () => {
    dispatch(confirmEmail(params.token));
  };


    return (
      <div className={classes.root}>
        <HeaderContainer profile={profile} authenticate={authenticate}routes={[]}></HeaderContainer>
        <div className={classes.vertical_center}>        
          <RegularButton 
            round
            size="lg"
            onClick={click}
            className={classes.button}
            color="primary"
          >
            {t("Confirm")}
          </RegularButton>
        </div>
      </div>
    );  
}

