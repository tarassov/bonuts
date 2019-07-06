import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import  DynamicModal  from 'modals/DynamicModal';
import ListActions from "actions/listActions"
import * as modals from 'modals/modalList'
import apis  from 'api/apiRoot'
import {loadUsers} from "actions/dashboardActions"
import ReduxFormGenerator from 'components/forms/reduxFormGenerator';
import LayoutModal from 'modals/LayoutModal';


const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => {
            
        },      
        
        onSubmit: (item) => {
           
        }
    }
}

export class DepartmentModal extends Component {

    constructor(props) {
        super(props);
        const formGenerator = new ReduxFormGenerator({
            reduxForm:{
                form:"profile_settings",
                enableReinitialize: true,
                keepDirtyOnReinitialize: true 
            },
            mapStateToProps:state => ({
                hasInitial: true,
                initialValues: state.modal.body ,
                formId: "department_form",
                fields: [
                    { name: "name", size:"lg" },
                    { name: "head_user_id",label: "department chief", size: "lg"}
                ],
                submitCaption: "Save changes"     
            }),
            mapDispatchToProps,
            title: "New department"             
           
        })

        this.generatedForm =  formGenerator.getForm();

    }
    componentDidMount(){
       // this.props.loadUsers()
    }

    submit = values => {
        if (this.props.modal.body.id)

        this.props.onAddItem({name: values.name})
        this.props.onClose()
    }

    render() {
        const GeneratedForm =  this.generatedForm
        return (
            <LayoutModal title="Department">
                <GeneratedForm />
            </LayoutModal>            
            )
  }
}

const mapStateToProps1 = (state,ownProps) => ({
    onClose: ownProps.onCloseModal,
    dashboard: state.dashboard
})

const mapDispatchToProps1 = (dispatch, ownProps) => {
    return{
        onAddItem: (item) =>{
            let actions = new ListActions(apis.departments)
            dispatch(actions.addItem(item))
        },
        onEditItem: (item) => {
            let actions = new ListActions(apis.departments)
            dispatch(actions.updateItem(item))
        },
        loadUsers: () => {
            dispatch(loadUsers())
          },
    }
    
}

export default DepartmentModal
