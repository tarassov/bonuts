import React, { Component } from "react";
import { connect } from "react-redux";
import { loadUsers, sendPoints } from "actions/dashboardActions";
import ShareModalView from "./ShareModalView";
import { enqueueSnackbar } from "actions/notifierActions";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onShare: (amount, from_profile, to_profile, comment) => {
      dispatch(sendPoints(amount, from_profile.id, [to_profile.id], comment));
    },
    loadUsers: () => {
      dispatch(loadUsers());
    },
    enqueueSnackbar: (notification) => {
      dispatch(enqueueSnackbar(notification));
    },
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    modal: state.modal,
    authenticate: state.authenticate,
    onClose: ownProps.onCloseModal,
    dashboard: state.dashboard,
    profile: state.profile,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareModalView);
