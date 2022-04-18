import { connect } from "react-redux";
import OperationText from "components/OperationText";
import * as modalActions from "actions/modal/modalActions";
import * as modals from "modals/modalList";

const mapDispatchToProps = (dispatch) => {
  return {
    onPurchaseClick: (operation) => {
      dispatch(
        modalActions.showModal(modals.PURCHASE_PREVIEW, {
          request: operation.requests[0],
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
