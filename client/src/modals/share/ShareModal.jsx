import React, { Component } from 'react';
import {connect} from 'react-redux'
import {loadUsers} from "actions/dashboardActions"
import ShareModalView from "./ShareModalView";
import { enqueueSnackbar } from 'actions/notifierActions';


const mapDispatchToProps = (dispatch) => {
    return {
        onShare: (user,amount) => {

        },
        loadUsers: () => {
          dispatch(loadUsers())
        },
        enqueueSnackbar: (notification) => {
          dispatch(enqueueSnackbar(notification))
        }
    }
}

const  mapStateToProps = (state,ownProps) => {
    return {
        modal: state.modal,
        authenticate: state.authenticate,
        onClose: ownProps.onCloseModal,
    }
}


export default connect( mapStateToProps,  mapDispatchToProps)(ShareModalView)
