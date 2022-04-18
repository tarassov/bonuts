import React from "react";
import { connect } from "react-redux";
import { loadProfile } from "actions/profileActions";
import App from "components/App";

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      onLoad: () => {
        dispatch(loadProfile());
      },
    },
  };
};

const mapStateToProps = (state) => {
  return {
    authenticate: state.authenticate,
    profile: state. profile,
    ui: state.ui,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
