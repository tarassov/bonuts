import React, { Component } from 'react'
import {connect} from 'react-redux'
import  { Redirect } from 'react-router-dom'
import {loadProfile,loadDistribBalance,loadSelfBalance} from 'actions/profile/profileActions'
import {loadEvents,likeEvent} from "../../actions/dashboardActions";
import Dashboard from 'layouts/Dashboard'
import {push} from 'connected-react-router'
import * as modalActions from "actions/modal/modalActions"
import * as modals from 'modals/modalList'

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
        },
        loadEvents: (page) => {
            dispatch(loadEvents(page))
        },
        onRedirectToStore: () => {
            dispatch(push('donuts'));
          }
        }
}


const  mapStateToProps = (state) => {
  return {
      authenticate: state.authenticate,
      profile: state.profile,
      events: state.events
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
                    loadEvents = {this.props.loadEvents}
                    items = {this.props.events.items}
                    page = {this.props.events.page}
                    total = {this.props.events.total}
                    per_page={this.props.events.per_page}
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
