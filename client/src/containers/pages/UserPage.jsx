import React from "react";
import { connect } from "react-redux";
import { loadAccount, saveProfile, saveAvatar } from "actions/profileActions";
import ListActions from "actions/actionFactory";
import apis from "api/apiRoot";

import User from "layouts/User";

const img = {
  display: "block",
  maxwidth: 150,
  maxHeight: 300,
  margin: 0,
  padding: 0,
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: () => {
      dispatch(loadAccount());
      let actionsDepartments = new ListActions(apis.departments);
      dispatch(actionsDepartments.loadItems());
    },

    onSubmit: (item) => {
      dispatch(saveProfile(item));
    },
    saveAvatar: (payLoad) => {
      dispatch(saveAvatar(payLoad));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
    account: state.account,
    profile: state.profile,
    system: state.system,
    departments: state.departments,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
