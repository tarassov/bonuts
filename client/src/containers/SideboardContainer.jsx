import { connect } from "react-redux";

import { authenticate } from "actions/authActions";
import Sideboard from "components/Sideboard";

const mapDispatchToProps = (dispatch) => {
  return {};
};

const mapStateToProps = (state, ownProps) => {
  return {
    authenticate: state.authenticate,
    routes: ownProps.routes,
    profile: state.profile,
  };
};

const SideboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sideboard);

export default SideboardContainer;
