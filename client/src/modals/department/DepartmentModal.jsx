import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import DynamicForm from 'components/forms/DynamicForm';
import { DynamicModal } from 'modals/DynamicModal';

export class DepartmentModal extends Component {
    click(values){
        console.log(values)
    }

    render() {
        return (
                <DynamicModal
                    formId={"department_form"} 
                    fields={[
                        { name: "Name", md:6 },
                    ]}
                    submitCaption={"Save changes"}             
                    onSubmit={this.click.bind(this)} 
                    title ={"New department"}
                />                
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentModal)
