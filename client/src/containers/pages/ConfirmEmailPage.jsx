import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import confrimEmailStyle from "assets/jss/components/confrimEmailStyle";
import { withStyles } from "@material-ui/core/styles";
import {useTranslation } from "react-i18next";
import { loadByToken, confirmEmail } from "actions/userActions";
import { Navigate } from "react-router-dom";
import {push} from 'redux-first-history'
import { useParams } from "react-router";


const mapDispatchToProps = (dispatch) => {
  return {
    loadByToken: (confirm_token) => {
      dispatch(loadByToken(confirm_token));
    },

    confirmEmail: (confirm_token) => {
      dispatch(confirmEmail(confirm_token));
    },

    redirect: () => {
      dispatch(push("/dashboard" ))
    }
  };
};

const mapStateToProps = (state) => {
  return {
    authenticate: state.authenticate,
    profile: state.profile,
  };
};

const useStyles = makeStyles(confrimEmailStyle)

function ConfirmEmailPage(props){


  const {t} = useTranslation()
  const classes = useStyles()
  const params =  useParams()
  const { profile } = props;

  useEffect(() => {
    props.loadByToken(params.token);
  }, [params.token])
 
  useEffect(() => {
    if (profile.user_not_found || profile.confirmed) {
     props.redirect()
    }
  }, [profile])

  const click = () => {
    props.confirmEmail(params.token);
  };


    return (
      <div className={classes.root}>
        <div className={classes.vertical_center}>
          <Button
            onClick={click}
            className={classes.button}
            color="secondary"
          >
            {t("Confirm")}
          </Button>
        </div>
      </div>
    );  
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmEmailPage);
