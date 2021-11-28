import { connect } from "react-redux";
import OperationText from "components/OperationText";
import * as modalActions from "actions/modal/modalActions";
import * as modals from "modals/modalList";

const mapDispatchToProps = (dispatch) => {
  return {
    onFromProfileClick: (operation) => {
      dispatch(
        modalActions.showModal(modals.PROFILE_PREVIEW, {
          user_name: operation.from_user_name,
          position: operation.from_profile.position,
          user_avatar: operation.from_profile.avatar,
          disabled: true,
        })
      );
    },
    onToProfileClick: (operation) => {
      console.log(operation);
      dispatch(
        modalActions.showModal(modals.PROFILE_PREVIEW, {
          user_name: operation.to_user_name,
          position: operation.to_profile.position,
          user_avatar: operation.to_profile.avatar,
          disabled: true,
        })
      );
    },
    onPurchaseClick: (operation) => {
      dispatch(
        modalActions.showModal(modals.PURCHASE_PREVIEW, {
          regard: operation.regards[0],
        })
      );
    },
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
  };
};

const OperationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OperationText);

export default OperationContainer;
