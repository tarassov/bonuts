import { connect } from "react-redux";
import { loadEvents } from "actions/eventActions";
import EventList from "components/EventList";

const mapDispatchToProps = (dispatch) => {
  return {
    loadEvents: (page, filter) => {
      console.log(filter);
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

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
