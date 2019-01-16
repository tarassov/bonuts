import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as dashboardActions from "actions/dashboardActions"
import ShareModalView from "./ShareModalView";


const mapDispatchToProps = (dispatch) => {
    return {
        onShare: (user,amount) => {

        },
        loadUsers: () => {
          dispatch(dashboardActions.loadUsers())
        }
    }
}

const  mapStateToProps = (state) => {
    return {
        modal: state.modal,
        authenticate: state.authenticate,
    }
}


export default connect( mapStateToProps,  mapDispatchToProps)(ShareModalView)
