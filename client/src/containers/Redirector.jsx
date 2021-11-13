import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const mapDispatchToProps = (dispatch) => {
  return {};
};

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
  };
};

function Redirector({ ui, children }) {
  if (ui.redirected) {
    return <Redirect push={ui.push} to={{
      pathname: ui.redirectTo,
      state: { data: ui.data }
    }}/>;
  } else {
    return <React.Fragment>{children}</React.Fragment>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Redirector);
