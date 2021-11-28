import React, { Component } from "react";
import ListActions from "actions/actionFactory";
import apis from "api/apiRoot";
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
      let actions = new ListActions(apis.schedulers);

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

export class SchedulerModal extends Component {
  constructor(props) {
    super(props);
    const formGenerator = new ReduxFormGenerator({
      reduxForm: {
        form: "scheduler_settings",
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
      },
      mapStateToProps: (state) => ({
        hasInitial: true,
        initialValues: state.modal.body,
        formId: "scheduler_form",
        fields: [
          { name: "comment", size: "lg", label: "Comment" },
          { name: "amount", size: "lg", label: "Amount" },
          { name: "day", size: "lg", label: "Day of month" },
          {
            name: "burn_old",
            label: "Burn old donuts",
            size: "lg",
            checkbox: true,
            disabled: state.modal.body.disabled,
          },
          {
            name: "active",
            label: "Active",
            size: "lg",
            checkbox: true,
            disabled: state.modal.body.disabled,
          },
        ],
        submitCaption: "Save changes",
        cancelable: true,
      }),
      mapDispatchToProps,
      title: "New schedule",
    });

    this.generatedForm = formGenerator.getForm();
  }

  render() {
    const GeneratedForm = this.generatedForm;
    return (
      <LayoutModal title="Schedule">
        <GeneratedForm {...this.props} />
      </LayoutModal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SchedulerModal);
