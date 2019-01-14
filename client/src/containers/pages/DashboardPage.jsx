import React, { PropTypes,Component } from 'react'
import Typography from '@material-ui/core/Typography'
import {connect} from 'react-redux'
import  { Redirect } from 'react-router-dom'
import {loadProfile} from 'actions/profile/profileActions'
import Dashboard from 'components/Dashboard'

const mapDispatchToProps = (dispatch) => {
  return {
        onRequestUser: () => {
            dispatch(loadProfile())
        }
  }
}


const  mapStateToProps = (state) => {
  return {
      authenticate: state.authenticate
  }
}



class DashboardPage  extends  Component {
    constructor(props) {
        super(props);
    }

    render() {
      if(this.props.authenticate.authenticated) {
        return (
                <div>
                    <Dashboard onRequestUser = {this.props.onRequestUser}/>
                </div>
            )

       }
       else
           return (
               <div>
                   <Redirect to='/'/>
               </div>
           )
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage)
