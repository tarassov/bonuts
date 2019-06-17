import React, {Component } from 'react'
import {connect} from 'react-redux'
import {loadProfilePage,saveProfile} from 'actions/profile/profileActions'
import Button from '@material-ui/core/Button';
import Profile from "layouts/Profile"
import  ProgressContainer from "containers/ProgressContainer"

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadProfile: () => {
            dispatch(loadProfilePage())
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
        system: state.system
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
