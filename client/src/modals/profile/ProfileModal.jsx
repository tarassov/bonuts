import React, { Component } from 'react'
import ListActions from "actions/listActions"
import apis  from 'api/apiRoot'
import {loadUsers} from "actions/dashboardActions"
import ReduxFormGenerator from 'components/forms/reduxFormGenerator';
import LayoutModal from 'modals/LayoutModal';
import {connect} from 'react-redux'


const mapDispatchToProps = (dispatch,props) => {
    return {
        onLoad: () => {
           let actionsDepartments = new ListActions(apis.departments)
           dispatch(actionsDepartments.loadItems())
        },      
        
        onSubmit: (item) => {
            let actions = new ListActions(apis.profiles)
            
            if (item.id !==undefined && item.id !==""){
                dispatch(actions.updateItem(item))    
            }
            else{
                dispatch(actions.addItem(item))
            }
            props.onCloseModal();
        }
    }
}

const  mapStateToProps = (state) => {
    console.log(state)
    return{
      profile: state.profile,
      departments: state.departments
    }
}

export class ProfileModal extends Component {

    constructor(props) {
        super(props);
            console.log(props)
            const formGenerator = new ReduxFormGenerator({
                reduxForm:{
                    form:"profile_edit",
                    enableReinitialize: true,
                    keepDirtyOnReinitialize: true 
                },
                mapStateToProps:state => ({
                    hasInitial: true,
                    initialValues: state.modal.body ,
                    formId: "profile_edit",
                    fields: [
                    { name: "email", label: "Email", md:12},
                    { name: "first_name", label: "Name", md:12 },
                    { name: "last_name", label: "Surname", md:12},
                    { name: "department", 
                        source: this.props.departments.items, 
                        size: "lg"},
                    { name: "position", label: "Position", size: "lg"}],
                    submitCaption: "Save changes"     ,
                    cancelable: true  
                }),
                mapDispatchToProps,
                title: "Profile",        
               
            })
    
            this.generatedForm =  formGenerator.getForm();
    

    }

    render() {
        const GeneratedForm =  this.generatedForm
        return (
            <LayoutModal title="Profile">
                <GeneratedForm  {...this.props}/>
            </LayoutModal>            
            )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfileModal)
