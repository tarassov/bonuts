import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import DynamicForm from 'components/forms/DynamicForm';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import  modalStyle from 'assets/jss/modals/modalStyle'
import { withTranslation, Trans } from "react-i18next";


export class DynamicModal extends Component {
    click(values){
        console.log(values)
    }

    render() {
        const {body,classes,title} = this.props;
        console.log(this.props)
        return (
            <React.Fragment>

                <div ref={el => (this.componentRef = el)}>
                <DialogTitle id="modal_dialog">
                <Trans>{title}</Trans>
                </DialogTitle>
                <DialogContent>
                    <DynamicForm
                        formId={"department_form"} 
                        fields={[
                            { name: "Name", md:6 },
                        ]}
                        submitCaption={"Save changes"}             
                        onSubmit={this.click.bind(this)} 
                    />                
                </DialogContent>
                </div>
            </React.Fragment>

        )
    }
}

DynamicModal.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string
};


export default  withStyles(modalStyle)(withMobileDialog()(DynamicModal));