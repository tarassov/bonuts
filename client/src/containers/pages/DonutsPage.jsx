import React from "react";
import { connect } from "react-redux";
import apis from "api/apiRoot";
import ListActions from "actions/actionFactory";
import Donuts from "layouts/Donuts";
import * as notifierActions from "actions/notifierActions";

const buyCallBack = {
  success: (dispatch, response) => {
    dispatch(
      notifierActions.enqueueSnackbar({
        message: "Donut added",
        options: {
          variant: "success",
        },
      })
    );
  },
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadItems: () => {
      let actions = new ListActions(apis.donuts);
      dispatch(actions.loadItems());
    },
    onBuy: (item) => {
      let listAction = new ListActions(apis.requests);
      dispatch(listAction.addItem({ donut_id: item.id }, buyCallBack));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
    profile: state.profile,
    donuts: state.donuts,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Donuts);
