import React, { Component } from "react";
import LoginForm from "components/forms/LoginForm";
import { connect } from "react-redux";
import { authenticate } from "../../actions/authActions";
import { recoverPassword } from "actions/userActions";
import { hideModal } from "actions/modal/modalActions";
import { Redirect } from "react-router-dom";
import RecoverForm from "components/forms/RecoverForm";
import { push } from "redux-first-history";

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      onLogin: (username, password) => {
        dispatch(authenticate(username, password));
      },
      hideModal: () => {
        dispatch(hideModal);
      },
      onRecoverPassword: (email) => {
        dispatch(recoverPassword(email));
        dispatch(push("/"));
      },
    },
  };
};

const mapStateToProps = (state) => {
  return {
    authenticate: state.authenticate,
    modal: state.modal,
  };
};

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recoverMode: false,
    };
  }
  submit = (values) => {
    this.props.actions.onLogin(values.username, values.password);
  };

  recoverModeToggle = () => {
    this.setState({ recoverMode: !this.state.recoverMode });
  };

  sendRecoverEmail = (values) => {
    this.props.actions.onRecoverPassword(values.email);
  };

  render() {
    if (this.state.recoverMode) {
      return (
        <div>
          <RecoverForm onSubmit={this.sendRecoverEmail} />
        </div>
      );
    }
    return (
      <div>
        <LoginForm
          onSubmit={this.submit}
          recoverToggle={this.recoverModeToggle.bind(this)}
          authenticate={this.props.authenticate}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
