import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import  modalStyle from 'assets/jss/modals/modalStyle'
import { withTranslation, Trans } from "react-i18next";
import StoreItemForm from "./StoreItemForm"




class StoreItemModalView extends React.Component {

  componentDidMount() {

  }



  submit = values => {
      console.log(values)
      this.props.addItem({name: values.donut_name, price: values.donut_price})
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
          />

        </React.Fragment>
    )
}
}
StoreItemModalView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default  withStyles(modalStyle)(withMobileDialog()(StoreItemModalView));
