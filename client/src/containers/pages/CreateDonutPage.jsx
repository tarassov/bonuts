import CreateDonutWizard from "components/forms/CreateDonutWizard";
import { connect } from "react-redux";
import { addItem } from "actions/storeActions";


const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (item) => {
        let formPayLoad = new FormData();
        formPayLoad.append("logo", item.logo);
        formPayLoad.append ("name", item.name)
        formPayLoad.append ("price", item.price)
        dispatch(addItem(formPayLoad));
      },
  
  };
};

const mapStateToProps = (state, props) => {
  return {
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDonutWizard);
