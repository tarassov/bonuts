import React, { Component } from "react";
import ListActions from "actions/actionFactory";
import apis from "api/apiRoot";
import { loadUsers } from "actions/dashboardActions";
import ReduxFormGenerator from "components/base/forms/reduxFormGenerator";
import LayoutModal from "modals/LayoutModal";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch, props) => {
  return {
    onLoad: () => {
      let listActions = new ListActions(apis.profiles);
      dispatch(listActions.loadItems());
    },

    onSubmit: (item) => {
      let actions = new ListActions(apis.departments);

      if (item.id !== undefined && item.id !== "") {
        dispatch(actions.updateItem(item));
      } else {
        dispatch(actions.addItem(item));
      }
      props.onCloseModal();
    },
  };
};

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
    profiles: state.profiles,
  };
};

export class DepartmentModal extends Component {
  constructor(props) {
    super(props);
    const formGenerator = new ReduxFormGenerator({
      reduxForm: {
        form: "profile_settings",
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
      },
      mapStateToProps: (state) => ({
        hasInitial: true,
        initialValues: state.modal.body,
        formId: "department_form",
        fields: [
          { name: "name", size: "lg" },
          {
            name: "head_profile",
            label: "department chief",
            size: "lg",
            source: props.profiles.items,
          },
        ],
        submitCaption: "Save changes",
        cancelable: true,
      }),
      mapDispatchToProps,
      title: "New department",
    });

    this.generatedForm = formGenerator.getForm();
  }

  render() {
    const GeneratedForm = this.generatedForm;
    return (
      <LayoutModal title="Department">
        <GeneratedForm {...this.props} />
      </LayoutModal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentModal);
