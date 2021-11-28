import React, { Component } from "react";
import ReduxFormGenerator from "components/base/forms/reduxFormGenerator";
import GridContainer from "components/base/grid/GridContainer";
import GridItem from "components/base/grid/GridItem";
import userStyle from "assets/jss/layouts/userStyle";
import { withTranslation, Trans } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";
import UserImage from "components/UserImage";

class User extends Component {
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
        initialValues: state.account.data,
        formId: "profile_settings",
        fields: [
          // { name: "user_avatar", label: "Avatar", md:3,image: true},
          {
            name: "email",
            label: "Email",
            xs: 12,
            size: "lg",
            disabled: !props.profile.admin,
          },
          { name: "first_name", label: "Name", lg: 6, size: "lg" },
          { name: "last_name", label: "Surname", lg: 6, size: "lg" },
          {
            name: "department",
            source: this.props.departments.items,
            size: "lg",
            disabled: !props.profile.admin,
          },
          { name: "position", label: "Position", size: "lg" },
        ],
        submitCaption: "Save changes",
      }),
      mapDispatchToProps: (dispatch) => ({
        onLoad: this.props.onLoad,
        onSubmit: this.props.onSubmit,
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

  readFile(files) {
    if (files && files[0]) {
      let formPayLoad = new FormData();
      formPayLoad.append("uploaded_image", files[0]);
      this.props.saveAvatar(formPayLoad);
      let preview = URL.createObjectURL(files[0]);
      this.setState({ newLoaded: true, preview: preview });
    }
  }

  render() {
    const { classes, account, saveAvatar } = this.props;
    const GeneratedForm = this.generatedForm;
    return (
      <React.Fragment>
        <GridContainer>
          <GridItem xs={12} sm={6} lg={6}>
            {account.data.id !== undefined && (
              <UserImage
                account={account.data}
                saveAvatar={saveAvatar}
                changeable={true}
              />
            )}
          </GridItem>
          <GridItem xs={12} sm={6} lg={6}>
            <GeneratedForm />
          </GridItem>
        </GridContainer>
      </React.Fragment>
    );
  }
}

export default withStyles(userStyle)(withTranslation()(User));
