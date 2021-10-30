import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import confrimEmailStyle from "assets/jss/components/confrimEmailStyle";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation, Trans } from "react-i18next";
import { loadByToken, confirmEmail } from "actions/userActions";
import { Redirect } from "react-router-dom";

const mapDispatchToProps = (dispatch) => {
  return {
    loadByToken: (confirm_token) => {
      dispatch(loadByToken(confirm_token));
    },

    confirmEmail: (confirm_token) => {
      dispatch(confirmEmail(confirm_token));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    authenticate: state.authenticate,
    profile: state.profile,
  };
};

class ConfirmEmailPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadByToken(this.props.match.params.token);
  }

  click = () => {
    this.props.confirmEmail(this.props.match.params.token);
  };
  render() {
    const { classes, profile } = this.props;
    if (profile.user_not_found || profile.confirmed) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className={classes.root}>
        <div className={classes.vertical_center}>
          <Button
            onClick={this.click}
            className={classes.button}
            color="secondary"
          >
            <Trans>Confirm</Trans>
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(confrimEmailStyle)(withTranslation()(ConfirmEmailPage)));
