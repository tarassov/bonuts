import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DynamicForm from 'components/forms/DynamicForm';

export default class Profile extends Component {

    click = (values) => {
        this.props.onSave(values);
    };

    render() {
        return (
                 <DynamicForm 
                    formId={"profile_settings"+Math.random()} 
                    fields={[
                        { name: "first_name", label: "Name", md:6 },
                        { name: "last_name", label: "Surname", md:6},
                        { name: "department", source: this.props.departments.items, size: "lg"}
                    ]}
                    submitCaption={"Save changes"}             
                    onSubmit={this.click.bind(this)} 
                    initialValues={this.props.profile}
                   // destroyOnUnmount = {true}
                 />
                 
        )
    }
}
