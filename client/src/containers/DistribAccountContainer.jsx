import { connect } from "react-redux";
import { loadDistribBalance } from "actions/profileActions";
import * as modalActions from "actions/modal/modalActions";
import AccountBalance from "components/AccountBalance";
import * as modals from "modals/modalList";
import { push } from "redux-first-history";

const mapDispatchToProps = (dispatch, props) => {
  return {
    getBalance: (profile) => {
      dispatch(loadDistribBalance(profile.id));
    },
    onShare: () => {
      dispatch(modalActions.showModal(modals.SHARE_DIALOG, {}));
    },
    onHistory: (profile) => {
      dispatch(push("/account/" + profile.distrib_account.id));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    authenticate: state.authenticate,
    profile: state.profile,
    balance: state.profile.distrib_balance,
    lastOperation: state.profile.lastDistribOperation,
    title: "Distrib account",
    shareable: true,
    shopable: false,
  };
};

const DistribAccountContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountBalance);

export default DistribAccountContainer;
