import React, {Component } from 'react'
import {connect} from 'react-redux'
import {loadProfilePage,saveProfile} from 'actions/profile/profileActions'
import Profile from "layouts/Profile"
import  ProgressContainer from "containers/ProgressContainer"
import ListActions from "actions/listActions"
import apis  from 'api/apiRoot'

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadProfile: () => {
            dispatch(loadProfilePage())
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
        profile: state.profile,
        system: state.system,
        departments: state.departments
      }
}



class UserPage  extends  Component {
    componentDidMount() {
        this.props.onLoadProfile();
    }


    render() {
           return (
                <div>
                    <ProgressContainer/>
                    {!this.props.system.isWaiting && <Profile {...this.props}/>}
                </div>
            )

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
