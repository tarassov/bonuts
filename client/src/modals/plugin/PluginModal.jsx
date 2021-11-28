import React, { Component } from "react";
import ListActions from "actions/actionFactory";
import apis from "api/apiRoot";
import ReduxFormGenerator from "components/base/forms/reduxFormGenerator";
import LayoutModal from "modals/LayoutModal";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";

const mapDispatchToProps = (dispatch, props) => {
  return {
    onLoad: () => {},

    onSubmit: (item) => {
      let actions = new ListActions(apis.tenant_plugins);

      if (item.id !== undefined && item.id !== "") {
        dispatch(actions.updateItem(item));
      } else {
        dispatch(actions.addItem(item));
      }
      props.onCloseModal();
    },
    onActivate: () => {
      let actions = new ListActions(apis.tenant_plugins);
      dispatch(actions.addItem({ plugin_id: props.body.id }));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
    profiles: state.profiles,
  };
};

export class PluginModal extends Component {
  constructor(props) {
    super(props);

    var fields = props.body.settings.map((property) => {
      return { name: property.name, size: "lg", label: property.notes };
    });
    const formGenerator = new ReduxFormGenerator({
      reduxForm: {
        form: "plugin_properties",
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
      },
      mapStateToProps: (state) => ({
        hasInitial: true,
        initialValues: state.modal.body,
        formId: "scheduler_form",
        fields: [
          { name: "name", size: "lg", label: "Name", disabled: true },
          ...fields,
          {
            name: "active",
            size: "lg",
            label: "Active",
            disabled: !state.modal.body.active,
            checkbox: true,
          },
        ],
        submitCaption: "Save changes",
        cancelable: true,
      }),
      mapDispatchToProps,
      title: "New plugin",
    });

    this.generatedForm = formGenerator.getForm();
  }

  render() {
    const GeneratedForm = this.generatedForm;
    return (
      <LayoutModal title="Plugin">
        <Button onClick={this.props.onActivate}>Refresh or Activate</Button>
        <GeneratedForm {...this.props} />
      </LayoutModal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PluginModal);
