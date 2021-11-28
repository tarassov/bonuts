import { connect } from "react-redux";
import AccountMenu from "components/AccountMenu";
import { authenticate, logout, checkAuth } from "actions/authActions";
import { push } from "redux-first-history";

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (username, password) => {
      dispatch(authenticate(username, password));
    },
    onLogOut: () => {
      dispatch(logout());
    },
    onCheckAuth: () => {
      dispatch(checkAuth());
    },
    onLoginRedirect: () => {
      dispatch(push("/login"));
    },
    onRegisterRedirect: () => {
      dispatch(push("/register"));
    },
    onAccount: () => {
      dispatch(push("/account"));
    },
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    authenticate: state.authenticate,
    location: ownProps.location,
    profile: state.profile,
    routes: ownProps.routes,
  };
};

const accountMenuStyle = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountMenu);

export default accountMenuStyle;
