import { connect } from "react-redux";
import { demo_authenticate } from "../../actions/authActions";

import Home from "layouts/Home";
import { push } from "redux-first-history";

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginRedirect: () => {
      dispatch(push("/login"));
    },
    onRegisterRedirect: () => {
      dispatch(push("/register"));
    },
    onDemo: () => {
      dispatch(demo_authenticate());
    },
  };
};

const mapStateToProps = (state) => {
  return {
    authenticate: state.authenticate,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
