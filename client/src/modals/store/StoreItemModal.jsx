import React, { Component } from 'react';
import {connect} from 'react-redux'
import StoreItemModalView from "./StoreItemModalView";
import { enqueueSnackbar } from 'actions/notifierActions';
import {addItem,updateItem} from 'actions/storeActions'


const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        enqueueSnackbar: (notification) => {
          dispatch(enqueueSnackbar(notification))
        },

        addItem: (item) => {
          dispatch(addItem(item))
        },

        updateItem: (item) => {
          dispatch(updateItem(item))
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
