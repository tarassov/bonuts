import React from "react";
import { connect } from "react-redux";
import { loadStore, showItem } from "actions/storeActions";
import Store from "components/Store";
import * as modalActions from "actions/modal/modalActions";
import * as storeActions from "actions/storeActions";
import * as modals from "modals/modalList";
import ListActions from "actions/actionFactory";
import apis from "api/apiRoot";
import { push } from "redux-first-history";

const mapDispatchToProps = (dispatch) => {
  return {
    loadStore: () => {
      dispatch(loadStore());
    },
    onAddItem: () => {
      //dispatch(modalActions.showModal(modals.NEW_STORE_ITEM, {}));
      dispatch(push('/donut_wizard'));
    },
    onEditItem: (id) => {
      dispatch(showItem(id));
    },
    onDeleteItem: (ids) => {
      var items = ids.map((id) => {
        return { id };
      });
      dispatch(storeActions.removeItem(items));
    },
    onBuyItem: (id) => {
      let listAction = new ListActions(apis.requests);
      dispatch(listAction.addItem({ donut_id: id }));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
    profile: state.profile,
    store: state.store,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Store);
