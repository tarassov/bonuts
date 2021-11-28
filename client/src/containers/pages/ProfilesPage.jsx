import { connect } from "react-redux";
import * as modalActions from "actions/modal/modalActions";
import * as modals from "modals/modalList";
import Profiles from "layouts/Profiles";
import ListActions from "actions/actionFactory";
import apis from "api/apiRoot";
import { adminDeposit } from "actions/profileActions";

const mapDispatchToProps = (dispatch) => {
  return {
    loadProfiles: () => {
      let listActions = new ListActions(apis.profiles);
      dispatch(listActions.loadItems());
      listActions = new ListActions(apis.departments);
      dispatch(listActions.loadItems());
    },
    onEdit: (profile, disabled) => {
      dispatch(
        modalActions.showModal(modals.PROFILE_EDIT, {
          ...profile,
          disabled: disabled,
        })
      );
    },
    onAdd: () => {
      dispatch(modalActions.showModal(modals.PROFILE_EDIT, {}));
    },
    onAdminDeposit: (profile) => {
      dispatch(adminDeposit(profile));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    profiles: state.profiles,
    profile: state.profile,
    departments: state.departments,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
