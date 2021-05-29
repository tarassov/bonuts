import React, { Component } from 'react'
import {connect} from 'react-redux'
import  { Redirect } from 'react-router-dom'
import {loadProfile,loadDistribBalance,loadSelfBalance} from 'actions/profile/profileActions'
import {loadEvents,likeEvent} from "actions/eventActions";
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
        loadEvents: (page,filter) => {
            dispatch(loadEvents(page,filter))
        },
        reloadEvents: (filter) => {
            dispatch(loadEvents(0,filter))
        },
        }
}


const  mapStateToProps = (state) => {
  return {
      authenticate: state.authenticate,
      profile: state.profile,
      events: state.events
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
