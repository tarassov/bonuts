import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import modalStyle from "assets/jss/modals/modalStyle";
import { withTranslation, Trans } from "react-i18next";

import ShareForm from "./ShareForm";

class ShareModalView extends React.Component {
  componentDidMount() {
    this.props.loadUsers();
  }

  submit = (values) => {
    console.log(values);
    this.props.onShare(
      values.point_amount,
      this.props.profile,
      values.user,
      values.comment
    );
    this.props.onClose();
  };

  render() {
    const { profile, dashboard } = this.props;
    return (
      <React.Fragment>
        <DialogTitle id="modal_dialog">
          <Trans>Share dialog</Trans>
        </DialogTitle>
        <ShareForm
          onSubmit={this.submit}
          label="Points"
          measure=""
          min={0}
          max={profile.distrib_balance}
          profiles={dashboard.profiles}
          userChanged={this.userChanged}
          onClose={this.props.onClose}
          currentUserId={profile.id}
        />
      </React.Fragment>
    );
  }
}
ShareModalView.propTypes = {
  classes: PropTypes.object.isRequired,
  onShare: PropTypes.func.isRequired,
  loadUsers: PropTypes.func.isRequired,
};

export default withStyles(modalStyle)(withMobileDialog()(ShareModalView));
