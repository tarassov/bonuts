import React from "react";
import { connect } from "react-redux";
import Statistic from "layouts/Statistic";
import ListActions from "actions/actionFactory";
import apis from "api/apiRoot";
const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: (args) => {
      let listActions = new ListActions(apis.profiles);
      dispatch(listActions.loadItems(args));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    profiles: state.profiles,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistic);
