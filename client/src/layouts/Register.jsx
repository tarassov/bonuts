import React, { Component } from "react";
import ReduxFormGenerator from "components/base/forms/reduxFormGenerator";
import GridContainer from "components/base/grid/GridContainer";
import GridItem from "components/base/grid/GridItem";
import registerStyle from "assets/jss/layouts/registerStyle";
import { withTranslation, Trans } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";

class Register extends Component {
  constructor(props) {
    super(props);
    const formGenerator = new ReduxFormGenerator({
      reduxForm: {
        form: "register_form",
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
      },
      mapStateToProps: (state) => ({
        hasInitial: false,
        initialValues: {},
        formId: "register_form",
        fields: [
          { name: "email", label: "Email", xs: 12, size: "lg" },
          { name: "first_name", label: "Name", xs: 12, size: "lg" },
          { name: "last_name", label: "Surname", xs: 12, size: "lg" },
          {
            name: "password",
            label: "Password",
            type: "password",
            xs: 12,
            size: "lg",
          },
        ],
        submitCaption: "Register",
      }),
      mapDispatchToProps: (dispatch) => ({
        onLoad: this.props.onLoad,
        onSubmit: this.props.onRegister,
      }),
    });

    this.state = {
      newLoaded: false,
      preview: null,
    };

    this.generatedForm = formGenerator.getForm();
  }

  componentDidMount() {
    URL.revokeObjectURL(this.state.preview);
  }

  componentWillUnmount() {
    URL.revokeObjectURL(this.state.preview);
  }

  UNSAFE_componentWillMount () {
    this.props.newRegister();
  }

  reset = (form_name) => {
    this.setState({ values: {} });
    this.props.onReset();
  };

  register = () => {
    this.props.onRegister({
      ...this.state.values,
      tenant: this.props.profile.tenant,
    });
  };

  render() {
    const { classes, account, saveAvatar } = this.props;
    const GeneratedForm = this.generatedForm;
    return (
      <React.Fragment>
        <GridContainer
          spacing={0}
          className={classes.container}
          direction="column"
          alignItems="center"
          justifyContent="center"
          //style={{ minHeight: '100vh' }}
        >
          <GridItem xs={12} sm={12} lg={12}>
            <GeneratedForm {...this.props} />
          </GridItem>
        </GridContainer>
      </React.Fragment>
    );
  }
}

export default withStyles(registerStyle)(withTranslation()(Register));
