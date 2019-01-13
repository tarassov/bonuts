import React, { PropTypes,Component } from 'react'
import Typography from '@material-ui/core/Typography'
import {connect} from 'react-redux'
import  { Redirect } from 'react-router-dom'
import App from 'components/App'

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {

        }
    }
}


const  mapStateToProps = (state) => {
    return {
        authenticate: state.authenticate
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(App)
