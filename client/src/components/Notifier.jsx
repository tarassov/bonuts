import PropTypes from "prop-types";
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import { removeSnackbar } from "actions/notifierActions";
import { withTranslation } from "react-i18next";
import { Button } from "@material-ui/core";

const ActionButton = (props) => {
  return (
    <React.Fragment>
      {props.notifyText}
      <Button onClick={props.onClick}>{props.children}</Button>
    </React.Fragment>
  );
};

class Notifier extends Component {
  displayed = [];

  storeDisplayed = (id) => {
    this.displayed = [...this.displayed, id];
  };

  shouldComponentUpdate({ notifications: newSnacks = [] }) {
    const { notifications: currentSnacks } = this.props;
    let notExists = false;
    for (let i = 0; i < newSnacks.length; i++) {
      if (notExists) continue;
      notExists =
        notExists ||
        !currentSnacks.filter(({ key }) => newSnacks[i].key === key).length;
    }
    return notExists;
  }

  componentDidUpdate() {
    let notifyElement;
    const { notifications = [], t, i18n } = this.props;
    notifications.forEach((notification) => {
      // Do nothing if snackbar is already displayed
      if (this.displayed.includes(notification.key)) return;
      // Display snackbar using notistack
      let text = t(notification.message);
      if (notification.message2 !== undefined) {
        text = text + t(notification.message2);
      }
      if (notification.action) {
        notifyElement = (
          <ActionButton notifyText={text} onClick={notification.action.onClick}>
            {t(notification.action.caption)}
          </ActionButton>
        );
      } else {
        notifyElement = text;
      }
      this.props.enqueueSnackbar(notifyElement, notification.options);
      // Keep track of snackbars that we've displayed
      this.storeDisplayed(notification.key);
      // Dispatch action to remove snackbar from redux store
      this.props.removeSnackbar(notification.key);
    });
  }
  render() {
    return null;
  }
}

const mapStateToProps = (state) => ({
  notifications: state.notifier.notifications,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ removeSnackbar }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(withSnackbar(Notifier)));

Notifier.propTypes = {
  notifyText: PropTypes.string,
};
