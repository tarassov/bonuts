import React, { PropTypes,Component } from 'react'
import Typography from '@material-ui/core/Typography'
import {connect} from 'react-redux'
import  { Redirect } from 'react-router-dom'
import {loadProfile,loadDistribBalance,loadSelfBalance} from 'actions/profile/profileActions'
import App from 'components/App'

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            onLoad: () =>{
                dispatch(loadProfile())
            }

        }
    }
}


const  mapStateToProps = (state) => {
    return {
        authenticate: state.authenticate
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(App)
