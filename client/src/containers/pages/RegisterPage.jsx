import React from 'react'
import {connect} from 'react-redux'
import {register} from 'actions/authActions'
import {loadTenantByDomain} from 'actions/profile/profileActions'
import * as actionTypes from "actions/actionTypes"
import {reset} from 'redux-form';
import Register from 'layouts/Register';


const mapDispatchToProps = (dispatch) => {
    return {
            onRegister: (registerValues) => {
                dispatch(register(registerValues))
            },
            onFindTenant: (domain) => {
                dispatch(loadTenantByDomain(domain))
            },
            onReset: (form_name) => {
                dispatch({type: actionTypes.loadFailed('CURRENT_TENANT')})
            }
    }
}


const  mapStateToProps = (state) => {
    return {
        authenticate: state.authenticate,
        profile: state.profile
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Register)
