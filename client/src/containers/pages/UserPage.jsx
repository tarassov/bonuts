import React, {Component } from 'react'
import {connect} from 'react-redux'
import {loadAccount,loadProfile, saveProfile} from 'actions/profile/profileActions'
import Profile from "layouts/Profile"
import  ProgressContainer from "containers/ProgressContainer"
import ListActions from "actions/listActions"
import apis  from 'api/apiRoot'
import Progress from "components/Progress";
import InitializeFromStateForm from 'layouts/InitializeFromStateForm';

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadProfile: () => {
            dispatch(loadAccount())
            dispatch(loadProfile())
            let actionsDepartments = new ListActions(apis.departments)
            dispatch(actionsDepartments.loadItems())
        },      
        
        onSave: (item) => {
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
    componentDidMount() {
       // this.props.onLoadProfile();
    }


    render() {
         return(
            <InitializeFromStateForm
            formId={"profile_settings"+Math.random()} 
            fields={[
                { name: "first_name", label: "Name", md:6 },
                { name: "last_name", label: "Surname", md:6},
                { name: "department", source: this.props.departments.items, size: "lg"}
            ]}
            submitCaption={"Save changes"}             
            onSubmit={this.props.onSave.bind(this)}/>
         )
           return (
                <div>
                    <Profile {...this.props}/>
                    {this.props.account.isLoading && (<Progress waitingText={this.props.system.waitingText}/>)}
                    {
                        !this.props.account.isLoading && 
                        this.props.account.loaded && 
                        <Profile {...this.props}/>
                    }
                </div>
            )

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
