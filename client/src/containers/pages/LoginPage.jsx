import React, { PropTypes,Component } from 'react'
import Typography from '@material-ui/core/Typography'
import {connect} from 'react-redux'
import {authenticate} from '../../actions/authActions'
import  { Redirect } from 'react-router-dom'


const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            onLogin: (username,password) => {
                dispatch(authenticate(username,password))
            },
        }
    }
}


const  mapStateToProps = (state) => {
    return {
        authenticate: state.authenticate
    }
}



class LoginPage  extends  Component {
    constructor(props) {
        super(props);
    }
    submit = values => {
        this.props.actions.onLogin(values.username, values.password)
    }

    checkSecret = url => {

    }


    render() {
        console.log('LoginPage')
        if(!this.props.authenticate || !this.props.authenticate.authenticated) {
            return (
                <div>
                    Login Page
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
