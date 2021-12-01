import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import confrimEmailStyle from "assets/jss/components/confrimEmailStyle";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { loadByRecoverToken, updatePassword } from "actions/userActions";
import { useParams } from "react-router-dom";
import NewPasswordForm from "components/forms/NewPasswordForm";
import Notifier from "components/Notifier";
import { push } from "redux-first-history";


const useStyles = makeStyles(confrimEmailStyle);


export default function NewPasswordLayout() {
  const [confirmed, setConfirmed] = useState(false);
  const classes = useStyles();
  const { t } = useTranslation();

  const profile = useSelector(state => state.profile)
  const authenticate = useSelector(state => state.authenticate)

  const dispatch = useDispatch();
  
  const params =  useParams()

  useEffect(() => {
    dispatch(loadByRecoverToken(params.token));
  }, []);

  useEffect(() => {
    if (profile.failed)  dispatch(push("/"));
  }, [profile.failed]);

  function click(values) {
    dispatch(updatePassword(params.token, values.new_password));
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
