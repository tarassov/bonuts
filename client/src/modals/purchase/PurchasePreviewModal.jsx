import React, { Component } from 'react'
import ListActions from "actions/listActions"
import apis  from 'api/apiRoot'

import ReduxFormGenerator from 'components/forms/reduxFormGenerator';
import LayoutModal from 'modals/LayoutModal';
import {connect} from 'react-redux'
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import userStyle from 'assets/jss/layouts/userStyle';

import { withStyles } from '@material-ui/core/styles';
import UserImage from 'components/UserImage';

const mapDispatchToProps = (dispatch,props) => {
    return {
        onLoad: () => {
        },      
        
        onSubmit: (item) => {
            props.onCloseModal();
        }
    }
}

const  mapStateToProps = (state) => {
    return{
      profile: state.profile,
      departments: state.departments
    }
}

export class PurchasePreviewModal extends Component {

    constructor(props) {
        super(props);

            const formGenerator = new ReduxFormGenerator({
                reduxForm:{
                    form:"purchase_preview",
                    enableReinitialize: true,
                    keepDirtyOnReinitialize: true 
                },
                mapStateToProps:state => ({
                    hasInitial: true,
                    initialValues: state.modal.body ,
                    formId: "purchase_edit",
                    fields: [
                    { name: "donut_name", label: "Donut", lg:12, size: "lg", disabled: true},
                    { name: "created_at", label: "Buy date", lg:12, size: "lg", disabled: true},
                    { name: "date_used", label: "Activate date", lg:12, size: "lg", disabled: true},
                    ],
                    submitCaption: "OK"     ,
                    cancelable: false
                }),
                mapDispatchToProps,
                title: "Purchase",        
               
            })
    
            this.generatedForm =  formGenerator.getForm();
    

    }

    render() {
        const GeneratedForm =  this.generatedForm
        const {classes, modal}  =this.props
        const modalProps = {...this.props, classes: {}}
        return (
            <LayoutModal title="Purchase">
                    <GridContainer>                      
                        <GridItem xs={12}  sm={12} >
                            <GeneratedForm {...modalProps}/>
                        </GridItem>
                    </GridContainer>
            </LayoutModal>            
            )
  }
}


export default withStyles(userStyle)(connect(mapStateToProps, mapDispatchToProps)(PurchasePreviewModal))
