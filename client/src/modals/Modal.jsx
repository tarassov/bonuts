import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "actions/modal/modalActions";
import modalList from "./modalList";
import DialogWindow from "./DialogWindow";
import * as modalResults from "actions/modal/modalResults";

const mapDispatchToProps = (dispatch) => {
  return {
    onCloseModal: () => {
      dispatch(actions.hideModal());
      dispatch(actions.resultModal(modalResults.EMPTY));
    },

    onAccept: (value) => {
      dispatch(actions.hideModal());
      dispatch(actions.resultModal(modalResults.OK, value));
    },
    onCancel: () => {
      dispatch(actions.hideModal());
      dispatch(actions.resultModal(modalResults.CANCEL));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
  };
};

class Modal extends Component {
  handleClose() {
    this.props.onCloseModal();
  }

  handleAccept(value) {
    this.props.onAccept(value);
  }

  handleCancel() {
    this.props.onCancel();
  }

  render() {
    const { modal } = this.props;
    let show = modal.show;
    let modalName = modal.modalName;
    if (!show) {
      return <React.Fragment />;
    } else {
      const ModalName = modalList[modalName];
      return (
        <DialogWindow open={true} onClose={this.handleClose.bind(this)}>
          <ModalName
            onCloseModal={this.handleClose.bind(this)}
            onAccept={this.handleAccept.bind(this)}
            onCancel={this.handleCancel.bind(this)}
            modal={modal}
            body={modal.body}
          />
        </DialogWindow>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
