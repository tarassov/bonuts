import React, {Component } from 'react'
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form'

import SimpleFieldForm from "components/forms/SimpleFieldForm"

class DynamicForm extends  Component {
    render() {
         const { classes,t,submitCaption,fields,formId} = this.props;

         const form = reduxForm({
             form: formId
         })(SimpleFieldForm)
         const DForm = form
         
         return (
           <DForm {...this.props} />
        )
    }

}

DynamicForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired,
    submitCaption: PropTypes.string.isRequired,
    formId: PropTypes.string.isRequired
}


export default DynamicForm
