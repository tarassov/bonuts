import React, {Component } from 'react'
import {connect} from 'react-redux'
import {loadAccount,loadProfile, saveProfile} from 'actions/profile/profileActions'
import  ProgressContainer from "containers/ProgressContainer"
import ListActions from "actions/listActions"
import apis  from 'api/apiRoot'
import Progress from "components/Progress";
import InitializeFromStateForm from 'layouts/InitializeFromStateForm';
import ReduxFormGenerator from 'components/forms/reduxFormGenerator';

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => {
            dispatch(loadAccount())
            dispatch(loadProfile())
            let actionsDepartments = new ListActions(apis.departments)
            dispatch(actionsDepartments.loadItems())
        },      
        
        onSubmit: (item) => {
            dispatch(saveProfile(item))
        }
    }
}


const  mapStateToProps = (state) => {
      return{
        dashboard: state.dashboard,
        account: state.account,
        system: state.system,
        departments: state.departments
      }
}



class UserPage  extends  Component {
    constructor(props) {
        super(props);
        
        const formGenerator = new ReduxFormGenerator({
            reduxForm:{
                form:"profile_settings",
                enableReinitialize: true,
                keepDirtyOnReinitialize: true 
            },
            mapStateToProps:state => ({
                initialValues: state.account.data ,
                formId: "profile_settings",
                fields: [
                { name: "first_name", label: "Name", md:6 },
                { name: "last_name", label: "Surname", md:6},
                { name: "department", source: this.props.departments.items, size: "lg"}],
                submitCaption: "Save changes"     
            }),
            mapDispatchToProps             
           
        })

        this.generatedForm =  formGenerator.getForm();

    }

    componentDidMount() {
       // this.props.onLoadProfile();
    }


    render() {
        const GeneratedForm =  this.generatedForm
        return (
            <GeneratedForm/>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
