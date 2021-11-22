import { connect } from "react-redux";
import { loadUsers, sendPoints } from "actions/dashboardActions";
import * as modalActions from "actions/modal/modalActions";
import * as modals from "modals/modalList";
import Settings from "../../layouts/settings/Settings";
import { reset, reduxForm } from "redux-form";
import apis from "api/apiRoot";
import ListActions from "actions/actionFactory";
import * as notifierActions from "actions/notifierActions";
import * as tenantActions from "actions/tenantActions";
import { saveLogo, saveTenant } from "actions/tenantActions";

const mapDispatchToProps = (dispatch, props) => {
  return {
    onShare: (
      amount,
      profile_ids,
      comment,
      form_id,
      burn_old,
      to_self_account
    ) => {
      dispatch(
        sendPoints(
          amount,
          null,
          profile_ids,
          comment,
          true,
          true,
          burn_old,
          to_self_account
        )
      );
      dispatch(reset(form_id));
    },
    loadUsers: () => {
      dispatch(loadUsers());
    },

    loadTenant: () => {
      dispatch(tenantActions.loadTenant());
    },

    onSaveTenant: (tenant) => {
      dispatch(saveTenant(tenant));
    },

    onSchedulerAdd: () => {
      dispatch(modalActions.showModal(modals.EDIT_SCHEDULER, {}));
    },

    onSchedulerEdit: (item) => {
      dispatch(modalActions.showModal(modals.EDIT_SCHEDULER, item));
    },

    onSchedulerDelete: (item) => {
      // dispatch(modalActions.showModal(modals.EDIT_SCHEDULER, {item}))
    },

    loadPlugins: () => {
      let actions = new ListActions(apis.plugins);
      dispatch(actions.loadItems());
    },

    onPluginEdit: (item) => {
      var settings_hash = {};
      item.settings.forEach((property) => {
        settings_hash[property.name] = property.value;
      });
      dispatch(
        modalActions.showModal(modals.EDIT_PLUGIN, {
          ...item,
          ...settings_hash,
        })
      );
    },

    loadSchedulers: () => {
      let actions = new ListActions(apis.schedulers);
      dispatch(actions.loadItems());
    },

    saveLogo: (payLoad) => {
      dispatch(saveLogo(payLoad));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
    profile: state.profile,
    schedulers: state.schedulers,
    plugins: state.plugins,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
