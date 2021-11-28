import React, { Component } from "react";
import { connect } from "react-redux";
import ConfirmModalView from "./ConfirmModalView";
import * as modalActions from "actions/modalActions";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    enqueueSnackbar: (notification) => {
      dispatch(enqueueSnackbar(notification));
    },

    onAccept: (item) => {
      dispatch(modalActions.okDialog());
    },

    onCancel: (item) => {
      dispatch(modalActions.cancelDialog());
    },
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    modal: state.modal,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModalView);
