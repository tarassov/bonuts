import React, { PropTypes,Component } from 'react'
import Typography from '@material-ui/core/Typography'
import LoginForm from 'components/forms/LoginForm'
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
      console.log(values)
        this.props.actions.onLogin(values.username, values.password)
    }


    render() {
        if(!this.props.authenticate || !this.props.authenticate.authenticated) {
            return (
                <div>
                    <LoginForm onSubmit ={this.submit} authenticate ={this.props.authenticate}/>
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