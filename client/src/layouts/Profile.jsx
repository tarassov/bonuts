import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DynamicForm from 'components/forms/DynamicForm';


const items = [
    {id:1,name:"Отдел продаж"},
    {id:2,name:"Отдел поставок"},
]



export default class Profile extends Component {


    click = () => {
     
    };

    render() {
        return (
            <div>
                 <DynamicForm 
                    formId={"profile_settings"} 
                    fields={[
                        { name: "Name", md:6 },
                        { name: "Surname", md:6},
                        { name: "Department", source: items, size: "lg"}
                    ]}
                    submitCaption={"Save changes"}             
                    onSubmit={this.click.bind(this)} 
                 />

            </div>
        )
    }
}
