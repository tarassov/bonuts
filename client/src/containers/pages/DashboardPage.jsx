import React, { PropTypes,Component } from 'react'
import Typography from '@material-ui/core/Typography'
import {connect} from 'react-redux'
import  { Redirect } from 'react-router-dom'
import {loadProfile,loadDistribBalance,loadSelfBalance} from 'actions/profile/profileActions'
import Dashboard from 'components/Dashboard'

const mapDispatchToProps = (dispatch) => {
  return {
        onRequestUser: () => {
            dispatch(loadProfile())
        },
        getDistribBalance: (profile) => {
            dispatch(loadDistribBalance(profile.distrib_account.id))
        },
        getSelfBalance: (profile) => {
            dispatch(loadSelfBalance(profile.self_account.id))
        }
  }
}


const  mapStateToProps = (state) => {
  return {
      authenticate: state.authenticate,
      profile: state.profile,
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
                    <Dashboard
                    onRequestUser = {this.props.onRequestUser}
                    profile={this.props.profile}
                    getDistribBalance={this.props.getDistribBalance}
                    getSelfBalance ={this.props.getSelfBalance}
                    />
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
