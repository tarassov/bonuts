import { connect } from "react-redux";
import {
  loadProfile,
  loadDistribBalance,
  loadSelfBalance,
} from "actions/profileActions";
import { loadEvents } from "actions/eventActions";
import Dashboard from "layouts/Dashboard";

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestUser: () => {
      dispatch(loadProfile());
    },
    getDistribBalance: (profile) => {
      dispatch(loadDistribBalance(profile.distrib_account.id));
    },
    getSelfBalance: (profile) => {
      dispatch(loadSelfBalance(profile.self_account.id));
    },
    loadEvents: (page, filter) => {
      dispatch(loadEvents(page, filter));
    },
    reloadEvents: (filter) => {
      dispatch(loadEvents(0, filter));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    authenticate: state.authenticate,
    profile: state.profile,
    events: state.events,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
