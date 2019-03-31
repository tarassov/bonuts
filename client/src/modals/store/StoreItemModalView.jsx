import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import  modalStyle from 'assets/jss/modals/modalStyle'
import { withTranslation, Trans } from "react-i18next";
import StoreItemForm from "./StoreItemForm"




class StoreItemModalView extends React.Component {

  constructor(props) {
     super(props);
     const {modal} = props
     if (modal.body !==undefined){
       var item = modal.body
       this.state = {donut_name: item.name, donut_price: item.price,donut_expiration: item.expiration_date, id: item.id};
     }
     else {
       this.state = {donut_name: 'New donut',donut_expiration: '2030-01-01', donut_price: 1}}
     }

  componentDidMount() {

  }



  submit = values => {
      this.setState(values)
      if (this.state.id ===undefined) {
        this.props.addItem({name: values.donut_name, price: values.donut_price})
      }
      else{
        this.props.updateItem({
          name: this.state.donut_name,
          price: this.state.donut_price,
          expiration_date: this.state.donut_expiration,
          id: this.state.id
        })
      }
      this.props.onClose()
  }

  render() {
    return (
        <React.Fragment>

          <DialogTitle id="modal_dialog"><Trans>Store item</Trans></DialogTitle>
          <StoreItemForm
            onSubmit= {this.submit}
            name = {this.props.name}
            price = {this.props.price}
            expiration = {this.props.expiration}
            onClose = {this.props.onClose}
            initialValues = {this.state}
          />

        </React.Fragment>
    )
}
}
StoreItemModalView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default  withStyles(modalStyle)(withMobileDialog()(StoreItemModalView));
