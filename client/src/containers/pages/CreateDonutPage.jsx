import CreateDonutWizard from "components/forms/CreateDonutWizard";
import { connect } from "react-redux";
import { addItem } from "actions/storeActions";


const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (item) => {
        dispatch(addItem(item));
      },
  
  };
};

const mapStateToProps = (state, props) => {
  return {
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDonutWizard);
