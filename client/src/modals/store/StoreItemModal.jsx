import React, { Component } from 'react';
import {connect} from 'react-redux'
import StoreItemModalView from "./StoreItemModalView";
import { enqueueSnackbar } from 'actions/notifierActions';


const mapDispatchToProps = (dispatch,ownProps) => {
    return {
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
        dashboard: state.dashboard,
        profile: state.profile
    }
}


export default connect( mapStateToProps,  mapDispatchToProps)(StoreItemModalView)
