import React, {Component } from 'react'
import {connect} from 'react-redux'
import {loadUsers,sendPoints} from "actions/dashboardActions"
import Button from '@material-ui/core/Button';

const mapDispatchToProps = (dispatch) => {
    return {
    }
}


const  mapStateToProps = (state) => {
      return{
        dashboard: state.dashboard,
        profile: state.profile
      }
}



class UserPage  extends  Component {


    render() {

        return (
                <div>

                </div>
            )

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
