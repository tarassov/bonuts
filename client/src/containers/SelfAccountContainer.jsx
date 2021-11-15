import { connect } from "react-redux";
import { loadSelfBalance } from "actions/profileActions";
import AccountBalance from "components/AccountBalance";
import { push } from "redux-first-history";

const mapDispatchToProps = (dispatch) => {
  return {
    getBalance: (profile) => {
      dispatch(loadSelfBalance(profile.id));
    },
    onShop: () => {
      //dispatch(modalActions.showModal(modals.SHARE_DIALOG, {}))
    },
    onRedirectToStore: () => {
      dispatch(push("donuts"));
    },
    onHistory: (profile) => {
      dispatch(push("/account/" + profile.self_account.id));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    authenticate: state.authenticate,
    profile: state.profile,
    balance: state.profile.self_balance,
    lastOperation: state.profile.lastSelfOperation,
    title: "Self account",
    shareable: false,
    shopable: true,
  };
};

const SelfAccountContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountBalance);

export default SelfAccountContainer;
