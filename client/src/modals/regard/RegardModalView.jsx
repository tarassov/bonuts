import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import  modalStyle from 'assets/jss/modals/modalStyle'
import { withTranslation, Trans } from "react-i18next";

import ReactToPrint from "react-to-print";



class RegardModalView extends React.Component {
  render() {
    const {body} = this.props;
    return (
        <React.Fragment>

          <DialogTitle id="modal_dialog"><Trans>{body.title}</Trans></DialogTitle>
          <div>
                <ReactToPrint
                trigger={() => <a href="#">Print this out!</a>}
                content={() => this.componentRef}
                />
                <div ref={el => (this.componentRef = el)}>
                 {body.uid}
                </div>
            </div>
        </React.Fragment>
    )
}
}
RegardModalView.propTypes = {
    classes: PropTypes.object.isRequired,
    uid: PropTypes.string,
    title: PropTypes.string
};

export default  withStyles(modalStyle)(withMobileDialog()(RegardModalView));
