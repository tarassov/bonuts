import React, { Children } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Navigate  } from "react-router-dom";

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
    return <Navigate  replace ={!ui.push} to={{
      pathname: ui.redirectTo,
      state: { data: ui.data }
    }}/>;
  } else {
    return <React.Fragment>{children}</React.Fragment>;
  }
}

Redirector.propTypes = {
  ui: PropTypes.object,
  children: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(Redirector);
