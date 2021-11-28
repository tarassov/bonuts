import React, { Component } from "react";
import PropTypes from "prop-types";
import ReduxFormGenerator from "components/base/forms/reduxFormGenerator";

import { connect } from "react-redux";

import userStyle from "assets/jss/layouts/userStyle";
import { 
  commentItem,  
} from "actions/eventActions";
import { withStyles } from "@material-ui/core/styles";

import * as notifierActions from "actions/notifierActions";
import { reset } from "redux-form";


const commentCallback = (form_id) => {
  return {
    success: (dispatch) => {
      dispatch(
        notifierActions.enqueueSnackbar({
          message: "Comment saved",
          options: {
            variant: "success",
          },
        })
      );
      dispatch(reset(form_id));
    },
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSubmit: (values) => {
      dispatch(
        commentItem(
          { item: props.event, comment: values.text },
          commentCallback("new_comment_form")
        )
      );
    },
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    event: ownProps.event,
  };
};

export class EventModal extends Component {
  UNSAFE_componentWillMount () {}

  constructor(props) {
    super(props);
    const formGenerator = new ReduxFormGenerator({
      reduxForm: {
        form: "new_comment_form",
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
      },
      mapStateToProps: () => ({
        hasInitial: false,
        formId: "new_comment_form",
        fields: [
          {
            name: "text",
            label: "your comment",
            size: "lg",
            xd: 12,
            rows: "4",
          },
        ],
        submitCaption: "Send",
        cancelable: false,
      }),
      mapDispatchToProps,
    });

    this.generatedForm = formGenerator.getForm();
  }

  render() {
    const {  event } = this.props;
    const GeneratedForm = this.generatedForm;
    return (
      <React.Fragment>
        <GeneratedForm
          formId={"new_comment_form"}
          onCloseModal={this.props.onCloseModal}
          event={event}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(userStyle)(
  connect(mapStateToProps, mapDispatchToProps)(EventModal)
);


EventModal.propTypes = {
  event: PropTypes.object.isRequired,
};
