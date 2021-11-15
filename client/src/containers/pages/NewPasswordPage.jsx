import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import confrimEmailStyle from "assets/jss/components/confrimEmailStyle";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { loadByRecoverToken, updatePassword } from "actions/userActions";
import { Redirect } from "react-router-dom";
import NewPasswordForm from "components/forms/NewPasswordForm";
import Notifier from "components/Notifier";
import { push } from "redux-first-history";


const useStyles = makeStyles(confrimEmailStyle);

const mapDispatchToProps = (dispatch) => {
  return {
    loadByRecover: (recover_token) => {
      dispatch(loadByRecoverToken(recover_token));
    },

    recover: (recover_token, password) => {
      dispatch(updatePassword(recover_token, password));
    },

    failed: () => {
      dispatch(push("/"));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    authenticate: state.authenticate,
    profile: state.profile,
  };
};

function NewPasswordPage(props) {
  const [confirmed, setConfirmed] = useState(false);
  const classes = useStyles();
  const { profile, authenticate } = props;
  const { t } = useTranslation();

  useEffect(() => {
    props.loadByRecover(props.match.params.token);
  }, []);

  useEffect(() => {
    if (props.profile.failed) props.failed();
  }, [props.profile.failed]);

  function click(values) {
    props.recover(props.match.params.token, values.new_password);
    setConfirmed(true);
  }

  return (
      <div className={classes.root}>
        <Notifier />
        <div className={classes.vertical_center}>
          <NewPasswordForm onSubmit={click} />
        </div>
      </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPasswordPage);
