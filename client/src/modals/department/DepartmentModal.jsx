import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import  DynamicModal  from 'modals/DynamicModal';
import ListActions from "actions/listActions"
import * as modals from 'modals/modalList'
import apis  from 'api/apiRoot'

export class DepartmentModal extends Component {

    submit = values => {
        console.log(values)
        this.props.onAddItem({name: values.name})
        this.props.onClose()
    }

    render() {
        return (
                <DynamicModal
                    formId={"department_form"} 
                    fields={[
                        { name: "name", size:"lg" },
                    ]}
                    submitCaption={"Save changes"}             
                    onSubmit={this.submit.bind(this)} 
                    onClose ={this.props.onClose}
                    onCancel={this.props.onClose}
                    title ={"New department"}
                    cancelable
                />                
        )
    }
}

const mapStateToProps = (state,ownProps) => ({
    onClose: ownProps.onCloseModal,
})

const mapDispatchToProps = (dispatch) => {
    return{
        onAddItem: (item) =>{
            let actions = new ListActions(apis.departments)
            dispatch(actions.addItem(item))
        }
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentModal)
