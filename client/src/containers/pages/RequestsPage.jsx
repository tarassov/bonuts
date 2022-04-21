import React, { Component } from "react";
import { connect } from "react-redux";
import Requests from "layouts/MyRequests";
import { push } from "redux-first-history";
import ListActions from "actions/actionFactory";
import apis from "api/apiRoot";
import * as modalActions from "actions/modal/modalActions";
import * as modals from "modals/modalList";
const mapDispatchToProps = (dispatch, props) => {
  return {
    loadRequests: (id, page) => {
      let listAction = new ListActions(apis.requests);
      dispatch(listAction.loadItems({ id, page }));
    },
    onRedirectToStore: () => {
      dispatch(push("donuts"));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    requests: state.requests,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Requests);
