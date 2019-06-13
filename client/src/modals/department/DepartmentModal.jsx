import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import DynamicForm from 'components/forms/DynamicForm';
import  DynamicModal  from 'modals/DynamicModal';

export class DepartmentModal extends Component {

    submit = values => {
        console.log(values)
     //   this.props.addDepartment(values.name)
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

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentModal)
